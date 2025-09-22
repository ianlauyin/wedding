use firestore::{FirestoreDb, errors::FirestoreError};
use framework::exception;
use framework::exception::error_code::NOT_FOUND;
use framework::exception::{Exception, Severity};
use futures::StreamExt;
use serde::{Serialize, de::DeserializeOwned};

use crate::exception::CoreRsResult;

pub trait CollectionExt {
    type Data: Serialize + DeserializeOwned + Send + Sync;

    fn collection_id(&self) -> &str;
    fn db(&self) -> &FirestoreDb;

    async fn get(&self, key: &str) -> CoreRsResult<Option<Self::Data>> {
        let result: Option<Self::Data> = self
            .db()
            .fluent()
            .select()
            .by_id_in(&resolve_collection_id(self.collection_id()))
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
            .from(resolve_collection_id(self.collection_id()).as_str())
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
            .into(&resolve_collection_id(self.collection_id()))
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
            .from(&resolve_collection_id(self.collection_id()))
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

fn resolve_collection_id(collection_id: &str) -> String {
    if cfg!(debug_assertions) {
        format!("debug_{}", collection_id)
    } else {
        collection_id.to_string()
    }
}
