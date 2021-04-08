use crate::message::*;
use crate::models::session_from_json;
use time::OffsetDateTime;

pub fn generate_group_message(msg_data: Value) -> ClientMessage {
  ClientMessage {
    client_id: msg_data["client_id"].to_string(),
    username: msg_data["username"].to_string(),
    channel: msg_data["channel"].to_string(),
    timestamp: (OffsetDateTime::now_utc().unix_timestamp()
      - OffsetDateTime::unix_epoch().unix_timestamp())
    .to_string()
    .into(),
    message: msg_data["message"].to_string(),
    session: if !msg_data["session"].is_null() {
      Some(session_from_json(&msg_data["session"]))
    } else {
      None
    },
  }
}
