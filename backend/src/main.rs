use axum::Router;
use framework::{
    exception::Exception,
    log::{self, ConsoleAppender},
    shutdown::Shutdown,
    web::server::{start_http_server, HttpServerConfig},
};
use tower_http::services::{ServeDir, ServeFile};

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

    let http_config = HttpServerConfig::default();

    let app = Router::new();
    let app = app.nest("/ajax", ajax_router().await);
    let app = app.nest_service("/static", website());

    start_http_server(app, signal, http_config).await
}

fn website() -> ServeDir<ServeFile> {
    let frontend_entry = ServeFile::new("../frontend/dist/index.html");
    ServeDir::new("../frontend/dist").fallback(frontend_entry)
}
