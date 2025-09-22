use chrono::{DateTime, Utc};
use framework::exception::CoreRsResult;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use wedding_interface::LoginResponse;

use super::ext::CollectionExt;
use firestore::FirestoreDb;

#[derive(Serialize, Deserialize)]
pub struct AdminRecord {
    token: Uuid,
    name: String,
    user_agent: String,
    ip_address: String,
    login_time: DateTime<Utc>,
}

impl AdminRecord {
    fn new(name: String, user_agent: String, ip_address: String) -> Self {
        let token = Uuid::new_v4();
        Self {
            token,
            name,
            user_agent,
            ip_address,
            login_time: Utc::now(),
        }
    }

    pub fn token(&self) -> &Uuid {
        &self.token
    }
}

impl Into<LoginResponse> for AdminRecord {
    fn into(self) -> LoginResponse {
        LoginResponse {
            name: self.name,
            login_time: self.login_time,
        }
    }
}

pub struct AdminRecordCollection(FirestoreDb);

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
}

impl From<FirestoreDb> for AdminRecordCollection {
    fn from(db: FirestoreDb) -> Self {
        Self(db)
    }
}

impl CollectionExt for AdminRecordCollection {
    type Data = AdminRecord;
    fn collection_id(&self) -> &str {
        "admin_record"
    }
    fn db(&self) -> &FirestoreDb {
        &self.0
    }
}
