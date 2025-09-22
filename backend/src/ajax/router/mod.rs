mod admin;
mod guest;
mod guest_internal;

use axum::Router;

use crate::ajax::state::AppState;
use crate::db::connect_db;
use crate::exception::CoreRsResult;

pub async fn ajax_router() -> CoreRsResult<Router> {
    let db = connect_db().await?;
    let state = AppState::init(db);

    Ok(Router::new()
        .merge(admin::admin_router())
        .merge(guest::guest_router(state.clone()))
        .merge(guest_internal::guest_internal_router(state.clone()))
        .with_state(state))
}
