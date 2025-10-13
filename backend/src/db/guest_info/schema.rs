use chrono::{DateTime, Local};
use serde::{Deserialize, Serialize};

use uuid::Uuid;
use wedding_interface::Side;

#[derive(Serialize, Deserialize)]
pub(super) struct GuestInfo {
    pub(super) id: String,
    pub(super) side: Side,
    pub(super) name: String,
    pub(super) relationship: String,
    pub(super) estimated_count: u32,
    pub(super) confirmed_count: Option<u32>,
    pub(super) created_by: String,
    pub(super) created_at: DateTime<Local>,
    pub(super) updated_by: String,
    pub(super) updated_at: DateTime<Local>,
}

impl GuestInfo {
    pub fn new(
        side: Side,
        name: &str,
        relationship: &str,
        estimated_count: u32,
        created_by: &str,
    ) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            confirmed_count: None,
            side: side,
            name: name.to_string(),
            relationship: relationship.to_string(),
            estimated_count: estimated_count,
            created_at: Local::now(),
            created_by: created_by.to_string(),
            updated_by: created_by.to_string(),
            updated_at: Local::now(),
        }
    }

    // fn into_invitation_info_response(self) -> InvitationInfoResponse {
    //     InvitationInfoResponse {
    //         name: self.name,
    //         estimated_count: self.estimated_count,
    //         confirmed_count: self.confirmed_count,
    //     }
    // }
}
