use crate::ajax::ajax_router;
use crate::logger::FirestoreAppender;
use crate::{exception::CoreRsResult, state::AppState};
use framework::log;
use framework::shutdown::Shutdown;
use framework::web::server::{HttpServerConfig, start_http_server};

mod ajax;
mod db;
mod env;
mod exception;
mod logger;
mod state;
mod website;

#[tokio::main]
async fn main() -> CoreRsResult<()> {
    let shutdown = Shutdown::new();
    let signal = shutdown.subscribe();
    shutdown.listen();

    let db = db::connect().await?;
    log::init_with_action(FirestoreAppender::new(db.clone()));

    let state = AppState::init(db.clone());
    let app = axum::Router::new();
    let app = app
        .nest("/ajax", ajax_router(state.clone()).await?)
        .fallback_service(website::html()?);

    start_http_server(app, signal, HttpServerConfig::default()).await
}
