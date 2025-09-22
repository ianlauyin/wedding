use axum::{Router, extract::Path, routing::get};
use framework::web::error::HttpResult;
use uuid::Uuid;

use crate::ajax::state::SharedState;

pub fn guest_router(state: SharedState) -> Router<SharedState> {
    Router::new().route("/guest/{id}", get(get_guest_info).put(update_guest_info))
}

// TODO: Implement
#[axum::debug_handler]
async fn get_guest_info(Path(uuid): Path<Uuid>) -> HttpResult<()> {
    Ok(())
}

// TODO: Implement, add guest info request body
#[axum::debug_handler]
async fn update_guest_info(Path(uuid): Path<Uuid>) -> HttpResult<()> {
    Ok(())
}
