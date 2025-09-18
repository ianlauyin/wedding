use axum::Router;

use crate::ajax::state::SharedState;

pub fn guest_router(_: SharedState) -> Router<SharedState> {
    Router::new()
}
