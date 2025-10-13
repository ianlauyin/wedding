use wedding_interface::{GuestInfoView, InvitationInfoResponse};

use super::GuestInfo;

impl Into<InvitationInfoResponse> for GuestInfo {
    fn into(self) -> InvitationInfoResponse {
        InvitationInfoResponse {
            name: self.name,
            estimated_count: self.estimated_count,
            confirmed_count: self.confirmed_count,
        }
    }
}

impl Into<GuestInfoView> for GuestInfo {
    fn into(self) -> GuestInfoView {
        GuestInfoView {
            name: self.name,
            estimated_count: self.estimated_count,
            confirmed_count: self.confirmed_count,
            id: self.id,
            side: self.side,
            relationship: self.relationship,
            created_by: self.created_by,
            created_at: self.created_at,
            updated_by: self.updated_by,
            updated_at: self.updated_at,
        }
    }
}
