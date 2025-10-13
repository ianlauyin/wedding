use chrono::Local;
use firestore::FirestoreDb;
use firestore::struct_path::paths;

use crate::db::ext::CollectionExt;
use crate::exception::CoreRsResult;
use wedding_backend_macros::Collection;
use wedding_interface::{
    CreateGuestInfoRequest, GuestInfoView, InvitationInfoResponse, UpdateGuestInfoRequest,
};

mod conversion;
mod schema;
use schema::GuestInfo;

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
            .map(|guest| guest.map(|guest| guest.into()))
    }

    pub async fn get_guest_info_view(&self, id: String) -> CoreRsResult<Option<GuestInfoView>> {
        self.get(&id)
            .await
            .map(|guest| guest.map(|guest| guest.into()))
    }

    pub async fn list_guest_info_views(&self) -> CoreRsResult<Vec<GuestInfoView>> {
        Ok(self
            .get_all()
            .await?
            .into_iter()
            .map(|guest| guest.into())
            .collect())
    }

    pub async fn add_guest(
        &self,
        request: CreateGuestInfoRequest,
        created_by: &str,
    ) -> CoreRsResult<GuestInfo> {
        let guest_info = GuestInfo::new(
            request.side,
            &request.name,
            &request.relationship,
            request.estimated_count,
            created_by,
        );
        self.insert(&guest_info.id.to_string(), &guest_info).await
    }

    pub async fn update_guest_info(
        &self,
        id: String,
        request: UpdateGuestInfoRequest,
        updated_by: &str,
    ) -> CoreRsResult<GuestInfo> {
        Ok(self.update()
            .fields(paths!(GuestInfo::{side, name, relationship, estimated_count, confirmed_count, updated_by, updated_at}))
            .in_col(self.collection_id())
            .document_id(id)
            .object(&GuestInfo {
                confirmed_count: request.confirmed_count,
                side: request.side,
                name: request.name,
                relationship: request.relationship,
                estimated_count: request.estimated_count,
                updated_by: updated_by.to_string(),
                updated_at: Local::now(),
                // these are not updated
                created_at: Local::now(),
                created_by: "".to_string(),
                id: "".to_string(),
            })
            .execute().await?)
    }

    pub async fn remove_guest(&self, id: String) -> CoreRsResult<()> {
        self.remove(&id).await
    }
}
