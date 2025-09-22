use framework::asset::asset_path;
use tower_http::services::{ServeDir, ServeFile};

use crate::exception::CoreRsResult;

pub fn html() -> CoreRsResult<ServeDir<ServeFile>> {
    let asset_path = asset_path("assets/web")?;
    let index_path = asset_path.join("index.html");
    Ok(ServeDir::new(asset_path).fallback(ServeFile::new(index_path)))
}
