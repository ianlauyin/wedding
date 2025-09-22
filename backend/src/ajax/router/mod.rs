mod admin;
mod guest;
mod internal_guest;

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
        .merge(internal_guest::internal_guest_router(state.clone()))
        .with_state(state))
}
