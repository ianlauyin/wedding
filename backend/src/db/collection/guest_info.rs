use chrono::{DateTime, Utc};
use firestore::FirestoreDb;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use wedding_backend_macros::Collection;
use wedding_interface::{CreateGuestInfoRequest, GuestInfoView, Side};

use crate::db::collection::ext::CollectionExt;
use crate::exception::CoreRsResult;

#[derive(Serialize, Deserialize)]
pub struct GuestInfo {
    id: String,
    side: Side,
    name: String,
    relationship: String,
    estimated_count: u32,
    confirmed_count: u32,
    created_by: String,
    created_at: DateTime<Utc>,
    updated_by: String,
    updated_at: DateTime<Utc>,
}

impl GuestInfo {
    fn from_request(request: CreateGuestInfoRequest, created_by: &str) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            confirmed_count: 0,
            side: request.side,
            name: request.name,
            relationship: request.relationship,
            estimated_count: request.estimated_count,
            created_at: Utc::now(),
            created_by: created_by.to_string(),
            updated_by: created_by.to_string(),
            updated_at: Utc::now(),
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
}

#[derive(Collection)]
#[schema(GuestInfo)]
pub struct GuestInfoCollection(FirestoreDb);

impl GuestInfoCollection {
    pub async fn add_guest(
        &self,
        request: CreateGuestInfoRequest,
        created_by: &str,
    ) -> CoreRsResult<GuestInfo> {
        let guest_info = GuestInfo::from_request(request, created_by);
        self.insert(&guest_info.id.to_string(), &guest_info).await
    }

    pub async fn get_all_guest(&self) -> CoreRsResult<Vec<GuestInfoView>> {
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
