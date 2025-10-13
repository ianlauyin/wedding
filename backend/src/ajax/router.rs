use axum::Router;

use crate::exception::CoreRsResult;
use crate::state::SharedState;

mod admin;
mod guest;
mod invitation;

pub async fn ajax_router(state: SharedState) -> CoreRsResult<Router> {
    Ok(Router::new()
        .merge(admin::admin_router())
        .merge(invitation::invitation_router())
        .merge(guest::guest_router(state.clone()))
        .with_state(state))
}
