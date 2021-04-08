use crate::message::*;
use time::OffsetDateTime;
use uuid::*;

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
      let session_id = Uuid::parse_str(&msg_data["session"].to_string()[1..37]);
      Some(session_id.unwrap())
    } else {
      None
    },
  }
}
