mod admin;
mod guest;

use crate::ajax::state::AppState;
use crate::db::connect_db;
use axum::Router;
use framework::exception::CoreRsResult;

pub async fn ajax_router() -> CoreRsResult<Router> {
    let db = connect_db().await?;
    let state = AppState::init(db);

    Ok(Router::new()
        .merge(guest::guest_router(state.clone()))
        .merge(admin::admin_router())
        .with_state(state))
}
