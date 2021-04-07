use crate::db::*;
use crate::message::*;
use diesel::pg::PgConnection;
use ws::{listen, Handler, Handshake, Message, Result, Sender};

use std::sync::Mutex;

lazy_static! {
  static ref CONNECTIONS: Mutex<Vec<ws::Sender>> = Mutex::new(Vec::new());
}

pub fn start() {
  listen("127.0.0.1:9001", |out| -> WebsocketServer {
    CONNECTIONS.lock().unwrap().push(out.clone());
    WebsocketServer {
      out,
      db: get_db_connection(),
    }
  })
  .unwrap();
}

struct WebsocketServer {
  db: PgConnection,
  out: Sender,
}

impl Handler for WebsocketServer {
  fn on_open(&mut self, _handshake: Handshake) -> Result<()> {
    Ok(())
  }

  fn on_message(&mut self, msg: Message) -> Result<()> {
    let msg_data = parse_message(&msg);

    match msg_data["channel"].as_str().unwrap() {
      "token" => {
        let token_msg = serde_json::to_string(&generate_token_message(msg_data)).unwrap();
        self.out.broadcast(token_msg)
      }

      "group" => {
        let group_msg = serde_json::to_string(&generate_group_message(msg_data)).unwrap();
        println!(
          "Connections in static CONNECTIONS: {}",
          CONNECTIONS.lock().unwrap().len()
        );
        //self.out.broadcast(group_msg)
        CONNECTIONS.lock().unwrap().get(0).unwrap().send(group_msg)
      }

      "roll" => {
        let roll_msg = serde_json::to_string(&generate_roll_message(msg_data)).unwrap();
        self.out.broadcast(roll_msg)
      }

      "map" => {
        let res = match msg_data["command"].as_str().unwrap() {
          "new" => {
            let created_map = generate_map_change_message(
              &msg_data,
              create_map(&self.db, msg_data["message"].to_string()),
            );

            let map_msg = serde_json::to_string(&created_map).unwrap();
            self.out.broadcast(map_msg)
          }
          _ => Ok(()),
        };

        res
      }
      _ => Ok(()),
    }
  }
}
