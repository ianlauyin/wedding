use wedding_interface::{GuestInfoView, InvitationInfoResponse, InvitationStatus};

use super::GuestInfo;

impl Into<InvitationInfoResponse> for GuestInfo {
    fn into(self) -> InvitationInfoResponse {
        let (status, count) = if self.confirmed_count.is_some() {
            (InvitationStatus::CONFIRMED, self.confirmed_count.unwrap())
        } else {
            (InvitationStatus::PENDING, self.estimated_count)
        };
        InvitationInfoResponse {
            name: self.name,
            status,
            count,
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
