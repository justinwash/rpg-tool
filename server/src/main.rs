#[macro_use]
extern crate diesel;
pub mod models;
pub mod schema;

use diesel::pg::PgConnection;

extern crate mio_extras;
extern crate time;
extern crate ws;

use ws::{listen, CloseCode, Handler, Handshake, Message, Result, Sender};

mod db;
mod message;

use db::*;
use message::*;

fn main() {
  let _db = get_db_connection();

  // for testing
  // let new_image = create_image(&db, "https://cdn.discordapp.com/attachments/298034711949869056/399212120362975233/PMCSpawnsnoCalloutsBlue.png");
  // println!("{:?}", new_image.id);
  listen("127.0.0.1:9001", |out| Server {
    out,
    db: get_db_connection(),
  })
  .unwrap();
}

struct Server {
  db: PgConnection,
  out: Sender,
}

impl Handler for Server {
  fn on_open(&mut self, handshake: Handshake) -> Result<()> {
    println!("New client connection '{:?}'. ", handshake.peer_addr);
    Ok(())
  }

  fn on_message(&mut self, msg: Message) -> Result<()> {
    let msg_data = parse_message(&msg);
    println!("Server got message '{}'. ", msg_data);

    match msg_data["channel"].as_str().unwrap() {
      "token" => {
        let token_msg = serde_json::to_string(&generate_token_message(msg_data)).unwrap();
        self.out.broadcast(token_msg)
      }

      "group" => {
        let group_msg = serde_json::to_string(&generate_group_message(msg_data)).unwrap();
        self.out.broadcast(group_msg)
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

  fn on_close(&mut self, code: CloseCode, reason: &str) {
    println!("WebSocket closing for ({:?}) {}", code, reason)
  }
}
