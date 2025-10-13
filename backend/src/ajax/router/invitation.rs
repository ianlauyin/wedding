use axum::Router;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::routing::{get, put};

use crate::db::GuestInfoCollection;
use crate::state::SharedState;
use framework::exception;
use framework::exception::error_code::NOT_FOUND;
use framework::web::body::Json;
use framework::web::error::HttpResult;
use wedding_interface::{IdPathParams, InvitationInfoResponse, UpdateGuestCountRequest};

pub fn invitation_router() -> Router<SharedState> {
    Router::new()
        .route("/invitation/{id}", get(get_invitation_info))
        .route("/invitation/{id}/guest-count", put(update_guest_count))
}

#[axum::debug_handler]
async fn get_invitation_info(
    Path(IdPathParams { id }): Path<IdPathParams>,
    State(state): State<SharedState>,
) -> HttpResult<Json<InvitationInfoResponse>> {
    let invitation_info = GuestInfoCollection::from(state.db.clone())
        .get_guest_info(id)
        .await?
        .ok_or(exception!(
            code = NOT_FOUND,
            message = "Invitation not found"
        ))?;

    Ok(Json(invitation_info.into()))
}

#[axum::debug_handler]
async fn update_guest_count(
    State(state): State<SharedState>,
    Path(IdPathParams { id }): Path<IdPathParams>,
    Json(request): Json<UpdateGuestCountRequest>,
) -> HttpResult<StatusCode> {
    GuestInfoCollection::from(state.db.clone())
        .update_count_by_guest(id, request.count)
        .await?;

    Ok(StatusCode::NO_CONTENT)
}
