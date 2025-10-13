use chrono::{DateTime, Local};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
pub struct AdminRecord {
    pub(super) token: String,
    pub(super) name: String,
    pub(super) user_agent: String,
    pub(super) ip_address: String,
    pub(super) login_time: DateTime<Local>,
}

impl AdminRecord {
    pub(super) fn new(name: String, user_agent: String, ip_address: String) -> Self {
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
