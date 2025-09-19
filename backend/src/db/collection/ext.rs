use firestore::{FirestoreDb, errors::FirestoreError};
use futures::StreamExt;
use serde::{Serialize, de::DeserializeOwned};

pub trait CollectionExt {
    type Data: Serialize + DeserializeOwned + Send + Sync;

    fn collection_id(&self) -> &str;
    fn db(&self) -> &FirestoreDb;

    async fn get(&self, key: &str) -> Result<Option<Self::Data>, FirestoreError> {
        let result: Option<Self::Data> = self
            .db()
            .fluent()
            .select()
            .by_id_in(self.collection_id())
            .obj()
            .one(key)
            .await?;
        Ok(result)
    }

    async fn get_batch(&self) -> Result<Vec<Self::Data>, FirestoreError> {
        let result: Vec<Self::Data> = self
            .db()
            .fluent()
            .select()
            .from(self.collection_id())
            .obj()
            .stream_query()
            .await?
            .collect()
            .await;
        Ok(result)
    }

    async fn insert(&self, key: &str, data: &Self::Data) -> Result<Self::Data, FirestoreError> {
        self.db()
            .fluent()
            .insert()
            .into(self.collection_id())
            .document_id(key)
            .object(data)
            .execute()
            .await
    }

    async fn remove(&self, key: &str) -> Result<(), FirestoreError> {
        self.db()
            .fluent()
            .delete()
            .from(self.collection_id())
            .document_id(key)
            .execute()
            .await
    }
}
