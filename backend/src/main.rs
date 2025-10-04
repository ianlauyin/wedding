use framework::log::{self, ConsoleAppender};
use framework::shutdown::Shutdown;
use framework::web::server::{HttpServerConfig, start_http_server};

use crate::{ajax::ajax_router, db::connect_db};
use crate::{exception::CoreRsResult, state::AppState};

mod ajax;
mod db;
mod env;
mod exception;
mod state;
mod website;

#[tokio::main]
async fn main() -> CoreRsResult<()> {
    let shutdown = Shutdown::new();
    let signal = shutdown.subscribe();
    shutdown.listen();

    log::init_with_action(ConsoleAppender);

    let db = connect_db().await?;
    let state = AppState::init(db.clone());

    let app = axum::Router::new();
    let app = app
        .nest("/ajax", ajax_router(state.clone()).await?)
        .fallback_service(website::html()?);

    start_http_server(app, signal, HttpServerConfig::default()).await
}
