use axum::{
    Router,
    extract::{Path, State},
    http::HeaderMap,
    middleware,
    routing::{delete, get, post},
};
use framework::web::{body::Json, error::HttpResult};
use wedding_interface::{CreateGuestInfoRequest, GetGuestListResponse};

use crate::ajax::{
    shared::{
        cookie::{CookieName, get_cookie},
        middleware::verify_admin_session,
    },
    state::SharedState,
};
use crate::db::{AdminRecordCollection, GuestInfoCollection};

pub fn internal_guest_router(state: SharedState) -> Router<SharedState> {
    Router::new()
        .route("/internal/guest", post(create_guest_info))
        .route("/internal/guest/list", get(get_guest_list))
        .route("/internal/guest/{id}", delete(remove_guest))
        .layer(middleware::from_fn_with_state(state, verify_admin_session))
}

async fn create_guest_info(
    State(state): State<SharedState>,
    header: HeaderMap,
    Json(request): Json<CreateGuestInfoRequest>,
) -> HttpResult<()> {
    // Token checked by middleware
    let token = get_cookie(&header, CookieName::LoginToken).unwrap();
    let admin_record = AdminRecordCollection::from(state.db.clone())
        .get_record(token)
        .await
        .unwrap()
        .unwrap();

    GuestInfoCollection::from(state.db.clone())
        .add_guest(request, &admin_record.name())
        .await?;

    Ok(())
}

async fn get_guest_list(
    State(state): State<SharedState>,
) -> HttpResult<Json<GetGuestListResponse>> {
    let guest_list = GuestInfoCollection::from(state.db.clone())
        .get_all_guest()
        .await?;

    Ok(Json(GetGuestListResponse { guest_list }))
}

async fn remove_guest(State(state): State<SharedState>, Path(id): Path<String>) -> HttpResult<()> {
    GuestInfoCollection::from(state.db.clone())
        .remove_guest(id)
        .await?;

    Ok(())
}
