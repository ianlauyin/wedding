use chrono::{DateTime, Utc};
use firestore::FirestoreDb;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use wedding_backend_macros::Collection;
use wedding_interface::LoginResponse;

use crate::db::collection::ext::CollectionExt;
use crate::exception::CoreRsResult;

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
}
