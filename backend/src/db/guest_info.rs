use chrono::Local;
use firestore::FirestoreDb;
use firestore::struct_path::paths;

use crate::db::ext::CollectionExt;
use crate::exception::CoreRsResult;
use framework::exception;
use framework::exception::error_code::NOT_FOUND;
use wedding_backend_macros::Collection;
use wedding_interface::{CreateGuestInfoRequest, UpdateGuestInfoRequest};

mod conversion;
mod schema;
mod validator;
use schema::GuestInfo;
use validator::GuestInfoValidator;

#[derive(Collection)]
#[schema(GuestInfo)]
pub struct GuestInfoCollection(FirestoreDb);

impl GuestInfoCollection {
    pub async fn get_guest_info(&self, id: String) -> CoreRsResult<Option<GuestInfo>> {
        self.get(&id)
            .await
            .map(|guest| guest.map(|guest| guest.into()))
    }

    pub async fn list_guest_info(&self) -> CoreRsResult<Vec<GuestInfo>> {
        self.get_all().await
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

        GuestInfoValidator::new(None)
            .check_name(&guest_info.name)?
            .check_relationship(&guest_info.relationship)?
            .check_estimated_count(guest_info.estimated_count)?;

        self.insert(&guest_info.id.to_string(), &guest_info).await
    }

    pub async fn update_guest_info(
        &self,
        id: String,
        request: UpdateGuestInfoRequest,
        updated_by: &str,
    ) -> CoreRsResult<GuestInfo> {
        let guest_info = self
            .get_guest_info(id.clone())
            .await?
            .ok_or(exception!(code = NOT_FOUND, message = "Guest not found"))?;

        GuestInfoValidator::new(Some(&guest_info))
            .check_name(&request.name)?
            .check_relationship(&request.relationship)?
            .check_estimated_count(request.estimated_count)?
            .check_confirmed_count(request.confirmed_count)?;

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

    pub async fn update_count_by_guest(&self, id: String, count: u32) -> CoreRsResult<()> {
        let guest_info = self
            .get_guest_info(id.clone())
            .await?
            .ok_or(exception!(code = NOT_FOUND, message = "Guest not found"))?;

        GuestInfoValidator::new(Some(&guest_info)).check_confirmed_count(Some(count))?;

        Ok(self
            .update()
            .fields(paths!(GuestInfo::{confirmed_count, updated_by, updated_at}))
            .in_col(self.collection_id())
            .document_id(id)
            .object(&GuestInfo {
                confirmed_count: Some(count),
                updated_by: "guest".to_string(),
                updated_at: Local::now(),
                ..guest_info
            })
            .execute()
            .await?)
    }
}
