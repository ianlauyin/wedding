use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

const EXPORT_PATH: &str = "../src/types.ts";

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct LoginRequest {
    pub name: String,
    pub password: String,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct LoginResponse {
    pub name: String,
    pub login_time: DateTime<Utc>,
}
