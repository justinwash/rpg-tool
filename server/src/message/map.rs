use crate::db::*;
use crate::message::*;
use crate::models::*;

use diesel::pg::PgConnection;
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

#[derive(Serialize, Deserialize)]
pub struct MapMessage {
  pub client_id: String,
  pub username: String,
  pub channel: String,
  pub command: String,
  pub timestamp: String,
  pub message: String,
}

pub fn create_map(db: &PgConnection, url: String) -> Image {
  create_image(db, &url)
}

pub fn generate_map_change_message(msg_data: &Value, map: Image) -> MapMessage {
  MapMessage {
    client_id: msg_data["client_id"].to_string(),
    username: "Server".to_string(),
    channel: "map".to_string(),
    command: "change".to_string(),
    timestamp: (OffsetDateTime::now_utc().unix_timestamp()
      - OffsetDateTime::unix_epoch().unix_timestamp())
    .to_string()
    .into(),
    message: map.url,
  }
}
