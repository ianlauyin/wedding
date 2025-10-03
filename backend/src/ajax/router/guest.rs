use axum::Router;
use axum::extract::Path;
use axum::extract::State;
use axum::http::HeaderMap;
use axum::http::StatusCode;
use axum::middleware;
use axum::routing::{delete, get, post};
use framework::exception;
use framework::exception::error_code::{NOT_FOUND, VALIDATION_ERROR};

use framework::web::{body::Json, error::HttpResult};
use wedding_interface::RemoveGuestPathParams;
use wedding_interface::{CreateGuestInfoRequest, GetGuestListResponse};

use crate::ajax::shared::{
    cookie::{CookieName, get_cookie},
    middleware::verify_admin_session,
};
use crate::db::{AdminRecordCollection, GuestInfoCollection};
use crate::state::SharedState;

pub fn guest_router(state: SharedState) -> Router<SharedState> {
    Router::new()
        .route("/guest/list", get(get_guest_list))
        .route("/guest/{id}", delete(remove_guest))
        .route("/guest", post(create_guest_info))
        .layer(middleware::from_fn_with_state(state, verify_admin_session))
}

#[axum::debug_handler]
async fn create_guest_info(
    State(state): State<SharedState>,
    header: HeaderMap,
    Json(request): Json<CreateGuestInfoRequest>,
) -> HttpResult<StatusCode> {
    let token = get_cookie(&header, CookieName::LoginToken).ok_or(exception!(
        code = VALIDATION_ERROR,
        message = "Token not found"
    ))?;
    let admin_record = AdminRecordCollection::from(state.db.clone())
        .get_record(token)
        .await
        .unwrap()
        .unwrap();

    GuestInfoCollection::from(state.db.clone())
        .add_guest(request, &admin_record.name())
        .await?;

    Ok(StatusCode::CREATED)
}

#[axum::debug_handler]
async fn get_guest_list(
    State(state): State<SharedState>,
) -> HttpResult<Json<GetGuestListResponse>> {
    let guest_list = GuestInfoCollection::from(state.db.clone())
        .list_guests_info()
        .await?;

    Ok(Json(GetGuestListResponse { guest_list }))
}

#[axum::debug_handler]
async fn remove_guest(
    State(state): State<SharedState>,
    Path(RemoveGuestPathParams { id }): Path<RemoveGuestPathParams>,
) -> HttpResult<StatusCode> {
    let guest_info_collection = GuestInfoCollection::from(state.db.clone());

    if guest_info_collection
        .get_guest_info(id.clone())
        .await?
        .is_none()
    {
        return Err(exception!(code = NOT_FOUND, message = "Guest not found"))?;
    }

    guest_info_collection.remove_guest(id).await?;

    Ok(StatusCode::NO_CONTENT)
}
