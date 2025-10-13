use chrono::{DateTime, Local};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

const EXPORT_PATH: &str = "../src/types.ts";

// General
#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct IdPathParams {
    pub id: String,
}

// Login Related
#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct LoginRequest {
    pub name: String,
    pub password: String,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct LoginResponse {
    pub name: String,
    pub login_time: DateTime<Local>,
}

// Internal Guest Related
#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
pub enum Side {
    BRIDE,
    GROOM,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct GuestInfoView {
    pub id: String,
    pub side: Side,
    pub name: String,
    pub relationship: String,
    pub estimated_count: u32,
    pub confirmed_count: Option<u32>,
    pub created_by: String,
    pub created_at: DateTime<Local>,
    pub updated_by: String,
    pub updated_at: DateTime<Local>,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct CreateGuestInfoRequest {
    pub side: Side,
    pub name: String,
    pub relationship: String,
    pub estimated_count: u32,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct GetGuestListResponse {
    pub guest_list: Vec<GuestInfoView>,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct UpdateGuestInfoRequest {
    pub side: Side,
    pub name: String,
    pub relationship: String,
    pub estimated_count: u32,
    pub confirmed_count: Option<u32>,
}

// Invitation Related

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub enum InvitationStatus {
    PENDING,
    CONFIRMED,
}

#[derive(TS, Debug, Serialize, Deserialize)]
#[ts(export ,export_to = EXPORT_PATH)]
#[serde(rename_all = "camelCase")]
pub struct InvitationInfoResponse {
    pub name: String,
    pub status: InvitationStatus,
    pub count: u32,
}
