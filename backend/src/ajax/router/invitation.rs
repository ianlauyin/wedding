use axum::Router;
use axum::extract::{Path, State};
use axum::routing::{get, put};

use framework::exception;
use framework::exception::error_code::NOT_FOUND;
use framework::web::body::Json;
use framework::web::error::HttpResult;
use wedding_interface::{GetInvitationInfoPathParams, InvitationInfoResponse};

use crate::db::GuestInfoCollection;
use crate::state::SharedState;

pub fn invitation_router() -> Router<SharedState> {
    Router::new()
        .route("/invitation/{id}", get(get_invitation_info))
        .route(
            "/invitation/{id}/update-guest-count",
            put(update_guest_count),
        )
}

#[axum::debug_handler]
async fn get_invitation_info(
    Path(GetInvitationInfoPathParams { id }): Path<GetInvitationInfoPathParams>,
    State(state): State<SharedState>,
) -> HttpResult<Json<InvitationInfoResponse>> {
    let invitation_info = GuestInfoCollection::from(state.db.clone())
        .get_invitation_info(id)
        .await?
        .ok_or(exception!(
            code = NOT_FOUND,
            message = "Invitation not found"
        ))?;

    Ok(Json(invitation_info))
}

#[axum::debug_handler]
async fn update_guest_count(Path(_id): Path<String>) -> HttpResult<()> {
    Ok(())
}
