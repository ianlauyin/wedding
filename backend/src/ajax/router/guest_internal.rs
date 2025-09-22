use axum::{Router, middleware};

use crate::ajax::{shared::middleware::check_login_cookie, state::SharedState};

pub fn guest_internal_router(state: SharedState) -> Router<SharedState> {
    Router::new().layer(middleware::from_fn_with_state(state, check_login_cookie))
}
