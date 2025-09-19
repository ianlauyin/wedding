use axum::Router;
use framework::{
    exception::Exception,
    log::{self, ConsoleAppender},
    shutdown::Shutdown,
    web::{
        server::{start_http_server, HttpServerConfig},
        site_directory::SiteDirectory,
    },
};

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

    let site_directory = SiteDirectory::new("../frontend/dist")?;
    let http_config = HttpServerConfig {
        site_directory: Some(site_directory),
        ..Default::default()
    };

    let app = Router::new();
    let app = app.nest("/ajax", ajax_router().await);

    start_http_server(app, signal, http_config).await
}
