mod admin;
mod guest;

pub async fn ajax_router() -> axum::Router {
    let state = crate::ajax::state::AppState::init().await;
    axum::Router::new()
        .merge(guest::guest_router(state.clone()))
        .merge(admin::login_router())
        .with_state(state)
}
