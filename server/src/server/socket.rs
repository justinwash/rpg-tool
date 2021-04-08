use crate::db::*;
use crate::message::*;
use diesel::pg::PgConnection;
use std::collections::HashMap;
use ws::{listen, Handler, Handshake, Message, Result, Sender};

use std::sync::Mutex;

lazy_static! {
  static ref CONNECTIONS: Mutex<HashMap<i32, ws::Sender>> = Mutex::new(HashMap::new());
}

pub fn start() {
  listen("127.0.0.1:9001", |out| -> WebsocketServer {
    WebsocketServer {
      db: get_db_connection(),
      out,
      user_id: None,
    }
  })
  .unwrap();
}

struct WebsocketServer {
  db: PgConnection,
  out: Sender,
  user_id: Option<i32>,
}

impl Handler for WebsocketServer {
  fn on_open(&mut self, _handshake: Handshake) -> Result<()> {
    Ok(())
  }

  fn on_close(&mut self, _close_code: ws::CloseCode, _reason: &str) {
    match self.user_id {
      Some(user_id) => match CONNECTIONS.lock().unwrap().get(&user_id) {
        Some(connection) => {
          println!("Connection closed: {:?}", connection);
          // CONNECTIONS.lock().unwrap().remove(&user_id);
        }
        _ => {}
      },
      _ => {}
    }
  }

  fn on_message(&mut self, msg: Message) -> Result<()> {
    let msg_data = parse_message(&msg);

    match msg_data["channel"].as_str().unwrap() {
      "register" => {
        let user_id = msg_data["user_id"].as_i64();

        if user_id.is_some() {
          self.user_id = Some(user_id.unwrap() as i32);

          CONNECTIONS
            .lock()
            .unwrap()
            .insert(user_id.unwrap() as i32, self.out.clone());
        }

        Ok(())
      }

      "token" => {
        let token_msg = serde_json::to_string(&generate_token_message(msg_data)).unwrap();
        self.out.broadcast(token_msg)
      }

      "group" => {
        let group_msg = &generate_group_message(msg_data);
        if group_msg.session.is_none() {
          println!(
            "No session present in message: {:?}, returning to sender",
            group_msg
          );
          return self.out.send(serde_json::to_string(&group_msg).unwrap());
        }

        let session = group_msg.session.clone().unwrap();

        let mut recipients: Vec<i32> = vec![session.dm];
        match session.players {
          Some(mut players) => {
            recipients.append(&mut players);
          }
          _ => {}
        }

        for r in recipients.iter() {
          match CONNECTIONS.lock().unwrap().get(&r) {
            Some(client) => {
              println!("Sending message to: {:?}", r);
              client
                .send(serde_json::to_string(&group_msg).unwrap())
                .unwrap();
            }
            _ => {}
          }
        }

        Ok(())
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
