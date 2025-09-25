use axum::Router;
use axum::extract::Path;
use axum::routing::{get, put};

use framework::web::error::HttpResult;

use crate::ajax::state::SharedState;

pub fn invitation_router(state: SharedState) -> Router<SharedState> {
    Router::new()
        .route("/invitation/{id}", get(get_invitation_info))
        .route(
            "/invitation/{id}/update-guest-count",
            put(update_guest_count),
        )
}

// TODO: Implement
#[axum::debug_handler]
async fn get_invitation_info(Path(id): Path<String>) -> HttpResult<()> {
    Ok(())
}

// TODO: Implement
#[axum::debug_handler]
async fn update_guest_count(Path(id): Path<String>) -> HttpResult<()> {
    Ok(())
}
