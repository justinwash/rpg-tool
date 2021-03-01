use serde_json::{Result, Value};
use std::collections::HashMap;
use uuid::Uuid;
use ws::listen;

struct _Message {
  client_id: Uuid,
  channel: String,
  username: String,
  message: String,
  timestamp: String,
}

struct Client {
  client_id: Uuid,
  username: String,
  socket: &'static ws::Sender,
}

fn main() {
  let mut clients: HashMap<Uuid, Client> = HashMap::new();

  if let Err(error) = listen("127.0.0.1:9001", |out: ws::Sender| {
    move |msg: ws::Message| {
      let message: Value =
        serde_json::from_str(msg.as_text().unwrap()).expect("Could not parse message");
      if message["channel"] == "registration" {}

      println!("Server got message '{}'", message);

      out.send(msg)
    }
  }) {
    println!("Failed to create WebSocket due to {:?}", error);
  }
}
