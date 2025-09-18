mod admin;
mod guest;

use crate::ajax::state::AppState;
use axum::Router;

pub async fn ajax_router() -> Router {
    let state = AppState::init().await;
    Router::new()
        .merge(guest::guest_router(state.clone()))
        .merge(admin::admin_router())
        .with_state(state)
}
