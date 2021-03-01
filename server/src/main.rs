extern crate mio_extras;
extern crate time;
extern crate ws;

use cute_dnd_dice::*;
use serde::{Deserialize, Serialize};
use serde_json::*;
use time::OffsetDateTime;
use ws::{listen, CloseCode, Handler, Handshake, Message, Result, Sender};

fn main() {
  listen("127.0.0.1:9001", |out| Server { out }).unwrap();
}

#[derive(Serialize, Deserialize)]
struct ClientMessage {
  client_id: String,
  username: String,
  channel: String,
  timestamp: String,
  message: String,
}

struct Server {
  out: Sender,
}

impl Handler for Server {
  fn on_open(&mut self, handshake: Handshake) -> Result<()> {
    println!("New client connection '{:?}'. ", handshake.peer_addr);
    Ok(())
  }

  fn on_message(&mut self, msg: Message) -> Result<()> {
    println!("Server got message '{}'. ", msg);

    let msg_data: Value = serde_json::from_str(msg.as_text().unwrap())
      .expect(&format!("Couldn't parse message: {:?}", msg));

    match msg_data["channel"].as_str().unwrap() {
      "board" => self.out.broadcast(msg),
      "group" => self.out.broadcast(msg),
      "roll" => {
        let result: u16;
        let mut res_msg = ClientMessage {
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
            res_msg.message = format!(
              "{} rolled {}. Result: {}",
              msg_data["username"].as_str().unwrap(),
              msg_data["message"].as_str().unwrap(),
              result
            );
          }
          _ => {
            res_msg.message = format!(
              "Could not parse {}'s {} to be rolled.",
              msg_data["username"].as_str().unwrap(),
              msg_data["message"].as_str().unwrap()
            );
          }
        }

        self.out.broadcast(serde_json::to_string(&res_msg).unwrap())
      }
      _ => Ok(()),
    }
  }

  fn on_close(&mut self, code: CloseCode, reason: &str) {
    println!("WebSocket closing for ({:?}) {}", code, reason)
  }
}
