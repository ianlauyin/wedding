use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

const EXPORT_PATH: &str = "../src/types.ts";

// Login Related
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

// Internal Guest Related
#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub enum Side {
    Bride,
    Groom,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct GuestInfoView {
    pub id: String,
    pub side: Side,
    pub name: String,
    pub relationship: String,
    pub estimated_count: u32,
    pub confirmed_count: u32,
    pub created_by: String,
    pub created_at: DateTime<Utc>,
    pub updated_by: String,
    pub updated_at: DateTime<Utc>,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct CreateGuestInfoRequest {
    pub side: Side,
    pub name: String,
    pub relationship: String,
    pub estimated_count: u32,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct GetGuestListResponse {
    pub guest_list: Vec<GuestInfoView>,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct RemoveGuestPathParams {
    pub id: String,
}

// Invitation Related
#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct GetInvitationInfoPathParams {
    pub id: String,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub struct InvitationInfoResponse {
    pub name: String,
}
