use firestore::update_builder::FirestoreUpdateInitialBuilder;
use firestore::{FirestoreDb, errors::FirestoreError};
use futures::StreamExt;
use serde::{Serialize, de::DeserializeOwned};

use crate::exception::CoreRsResult;
use framework::exception;
use framework::exception::error_code::NOT_FOUND;
use framework::exception::{Exception, Severity};

pub(in crate::db) trait CollectionExt {
    type Data: Serialize + DeserializeOwned + Send + Sync;

    fn collection_id(&self) -> &str;
    fn db(&self) -> &FirestoreDb;

    fn update(&self) -> FirestoreUpdateInitialBuilder<FirestoreDb> {
        self.db().fluent().update()
    }

    async fn get(&self, key: &str) -> CoreRsResult<Option<Self::Data>> {
        let result: Option<Self::Data> = self
            .db()
            .fluent()
            .select()
            .by_id_in(&self.collection_id())
            .obj()
            .one(key)
            .await
            .map_err(map_firestore_error)?;
        Ok(result)
    }

    async fn get_all(&self) -> CoreRsResult<Vec<Self::Data>> {
        let result: Vec<Self::Data> = self
            .db()
            .fluent()
            .select()
            .from(self.collection_id())
            .obj()
            .stream_query()
            .await
            .map_err(map_firestore_error)?
            .collect()
            .await;
        Ok(result)
    }

    async fn insert(&self, key: &str, data: &Self::Data) -> CoreRsResult<Self::Data> {
        let result = self
            .db()
            .fluent()
            .insert()
            .into(&self.collection_id())
            .document_id(key)
            .object(data)
            .execute()
            .await
            .map_err(map_firestore_error)?;
        Ok(result)
    }

    async fn remove(&self, key: &str) -> CoreRsResult<()> {
        self.db()
            .fluent()
            .delete()
            .from(&self.collection_id())
            .document_id(key)
            .execute()
            .await
            .map_err(map_firestore_error)?;
        Ok(())
    }
}

fn map_firestore_error(error: FirestoreError) -> Exception {
    if let FirestoreError::DataNotFoundError(data_not_found_error) = error {
        exception!(
            severity = Severity::Warn,
            code = NOT_FOUND,
            message = "Data not found in firestore",
            source = data_not_found_error
        )
    } else {
        error.into()
    }
}
