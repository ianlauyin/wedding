use chrono::{DateTime, Local};
use firestore::FirestoreDb;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use wedding_backend_macros::Collection;
use wedding_interface::{
    CreateOrUpdateGuestInfoRequest, GuestInfoView, InvitationInfoResponse, Side,
};

use crate::db::collection::ext::CollectionExt;
use crate::exception::CoreRsResult;

#[derive(Serialize, Deserialize)]
pub struct GuestInfo {
    id: String,
    side: Side,
    name: String,
    relationship: String,
    estimated_count: u32,
    confirmed_count: Option<u32>,
    created_by: String,
    created_at: DateTime<Local>,
    updated_by: String,
    updated_at: DateTime<Local>,
}

impl GuestInfo {
    fn from_request(request: CreateOrUpdateGuestInfoRequest, created_by: &str) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            confirmed_count: None,
            side: request.side,
            name: request.name,
            relationship: request.relationship,
            estimated_count: request.estimated_count,
            created_at: Local::now(),
            created_by: created_by.to_string(),
            updated_by: created_by.to_string(),
            updated_at: Local::now(),
        }
    }

    fn into_view(self) -> GuestInfoView {
        GuestInfoView {
            id: self.id.to_string(),
            side: self.side,
            name: self.name,
            relationship: self.relationship,
            estimated_count: self.estimated_count,
            confirmed_count: self.confirmed_count,
            created_by: self.created_by,
            created_at: self.created_at,
            updated_by: self.updated_by,
            updated_at: self.updated_at,
        }
    }

    fn into_invitation_info_response(self) -> InvitationInfoResponse {
        InvitationInfoResponse {
            name: self.name,
            estimated_count: self.estimated_count,
            confirmed_count: self.confirmed_count,
        }
    }
}

#[derive(Collection)]
#[schema(GuestInfo)]
pub struct GuestInfoCollection(FirestoreDb);

impl GuestInfoCollection {
    pub async fn get_invitation_info(
        &self,
        id: String,
    ) -> CoreRsResult<Option<InvitationInfoResponse>> {
        self.get(&id)
            .await
            .map(|guest| guest.map(|guest| guest.into_invitation_info_response()))
    }

    pub async fn get_guest_info(&self, id: String) -> CoreRsResult<Option<GuestInfo>> {
        self.get(&id).await
    }

    pub async fn add_guest(
        &self,
        request: CreateOrUpdateGuestInfoRequest,
        created_by: &str,
    ) -> CoreRsResult<GuestInfo> {
        let guest_info = GuestInfo::from_request(request, created_by);
        self.insert(&guest_info.id.to_string(), &guest_info).await
    }

    pub async fn list_guests_info(&self) -> CoreRsResult<Vec<GuestInfoView>> {
        Ok(self
            .get_all()
            .await?
            .into_iter()
            .map(|guest| guest.into_view())
            .collect())
    }

    pub async fn remove_guest(&self, id: String) -> CoreRsResult<()> {
        self.remove(&id).await
    }
}
