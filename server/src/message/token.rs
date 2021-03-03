use serde::{Deserialize, Serialize};
use serde_json::*;
use time::OffsetDateTime;

#[derive(Serialize, Deserialize)]
pub struct TokenPosition {
  pub x: i32,
  pub y: i32,
}

#[derive(Serialize, Deserialize)]
pub struct TokenMessage {
  pub client_id: String,
  pub username: String,
  pub channel: String,
  pub timestamp: String,
  pub token_id: String,
  pub token_position: TokenPosition,
}

pub fn generate_token_message(msg_data: Value) -> TokenMessage {
  TokenMessage {
    client_id: msg_data["client_id"].to_string(),
    username: msg_data["username"].to_string(),
    channel: msg_data["channel"].to_string(),
    timestamp: (OffsetDateTime::now_utc().unix_timestamp()
      - OffsetDateTime::unix_epoch().unix_timestamp())
    .to_string()
    .into(),
    token_id: msg_data["token_id"].to_string(),
    token_position: TokenPosition {
      x: msg_data["token_position"]["x"]
        .to_string()
        .parse::<i32>()
        .unwrap(),
      y: msg_data["token_position"]["y"]
        .to_string()
        .parse::<i32>()
        .unwrap(),
    },
  }
}
