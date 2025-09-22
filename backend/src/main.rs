use axum::Router;
use framework::{
    log::{self, ConsoleAppender},
    shutdown::Shutdown,
    web::server::{HttpServerConfig, start_http_server},
};

use crate::ajax::ajax_router;
use crate::exception::CoreRsResult;

mod ajax;
mod db;
mod env;
mod exception;
mod website;

#[tokio::main]
async fn main() -> CoreRsResult<()> {
    log::init_with_action(ConsoleAppender);

    let shutdown = Shutdown::new();
    let signal = shutdown.subscribe();
    shutdown.listen();

    let app = Router::new();
    let app = app
        .nest("/ajax", ajax_router().await?)
        .fallback_service(website::html()?);

    start_http_server(app, signal, HttpServerConfig::default()).await
}
