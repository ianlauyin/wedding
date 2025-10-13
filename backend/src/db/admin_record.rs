use crate::db::ext::CollectionExt;
use crate::exception::CoreRsResult;
use wedding_backend_macros::Collection;

mod conversion;
mod schema;
use schema::AdminRecord;

#[derive(Collection)]
#[schema(schema::AdminRecord)]
pub struct AdminRecordCollection(firestore::FirestoreDb);

impl AdminRecordCollection {
    pub async fn add_record(
        &self,
        name: String,
        user_agent: String,
        ip_address: String,
    ) -> CoreRsResult<AdminRecord> {
        let admin_record = AdminRecord::new(name, user_agent, ip_address);
        let token = admin_record.token.to_string();
        self.insert(&token, &admin_record).await
    }

    pub async fn get_record(&self, token: String) -> CoreRsResult<Option<AdminRecord>> {
        self.get(&token).await
    }

    pub async fn remove_record(&self, token: String) -> CoreRsResult<()> {
        self.remove(&token).await
    }
}
