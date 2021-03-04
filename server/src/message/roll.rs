use cute_dnd_dice::*;
use time::OffsetDateTime;

use crate::message::*;

pub fn generate_roll_message(msg_data: Value) -> ClientMessage {
  let result: u16;
  let mut result_msg = ClientMessage {
    client_id: 0.to_string(),
    username: "Server".to_string(),
    channel: "group".to_string(),
    timestamp: (OffsetDateTime::now_utc().unix_timestamp()
      - OffsetDateTime::unix_epoch().unix_timestamp())
    .to_string()
    .into(),
    message: String::new(),
  };

  let roll = Roll::from_str(msg_data["message"].as_str().unwrap());
  match roll {
    Ok(r) => {
      result = r.roll();
      result_msg.message = format!(
        "{} rolled {}. Result: {}",
        msg_data["username"].as_str().unwrap(),
        msg_data["message"].as_str().unwrap(),
        result
      );
    }
    _ => {
      result_msg.message = format!(
        "Could not parse {}'s {} to be rolled.",
        msg_data["username"].as_str().unwrap(),
        msg_data["message"].as_str().unwrap()
      );
    }
  }

  result_msg
}
