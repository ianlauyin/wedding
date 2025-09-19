use axum::Router;
use framework::{
    asset::asset_path,
    exception::Exception,
    log::{self, ConsoleAppender},
    shutdown::Shutdown,
    web::server::{HttpServerConfig, ServeDir, start_http_server},
};
use tower_http::services::ServeFile;

use crate::ajax::ajax_router;

mod ajax;
mod db;
mod env;
mod interface;

#[tokio::main]
async fn main() -> Result<(), Exception> {
    log::init_with_action(ConsoleAppender);

    let shutdown = Shutdown::new();
    let signal = shutdown.subscribe();
    shutdown.listen();

    let app = Router::new();
    let app = app
        .nest("/ajax", ajax_router().await)
        .fallback_service(website()?);

    start_http_server(app, signal, HttpServerConfig::default()).await
}

fn website() -> Result<ServeDir<ServeFile>, Exception> {
    let asset_path = asset_path("assets/web/")?;
    let index_path = asset_path.join("index.html");
    Ok(ServeDir::new(asset_path).fallback(ServeFile::new(index_path)))
}
