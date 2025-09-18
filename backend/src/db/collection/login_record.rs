use crate::interface::login::LoginResponse;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use super::ext::CollectionExt;
use firestore::{errors::FirestoreError, FirestoreDb};

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
    ) -> Result<AdminRecord, FirestoreError> {
        let login_record = AdminRecord::new(name, user_agent, ip_address);
        let token = login_record.token.to_string();
        self.insert(&token, &login_record).await
    }

    pub async fn get_record(&self, token: String) -> Result<Option<AdminRecord>, FirestoreError> {
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
        "admin_records"
    }
    fn db(&self) -> &FirestoreDb {
        &self.0
    }
}
