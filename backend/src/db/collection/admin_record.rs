use chrono::{DateTime, Local};
use firestore::FirestoreDb;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::db::collection::CollectionExt;
use crate::exception::CoreRsResult;
use wedding_backend_macros::Collection;
use wedding_interface::LoginResponse;

#[derive(Serialize, Deserialize)]
pub struct AdminRecord {
    token: String,
    name: String,
    user_agent: String,
    ip_address: String,
    login_time: DateTime<Local>,
}

impl AdminRecord {
    fn new(name: String, user_agent: String, ip_address: String) -> Self {
        let token = Uuid::new_v4().to_string();
        Self {
            token,
            name,
            user_agent,
            ip_address,
            login_time: Local::now(),
        }
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn token(&self) -> &str {
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

#[derive(Collection)]
#[schema(AdminRecord)]
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

    pub async fn remove_record(&self, token: String) -> CoreRsResult<()> {
        self.remove(&token).await
    }
}
