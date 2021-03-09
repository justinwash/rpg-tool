mod client;
mod group;
mod map;
mod roll;
mod token;

pub use client::*;
pub use group::*;
pub use map::*;
pub use roll::*;
pub use token::*;

use serde_json::*;

pub fn parse_message(msg: &ws::Message) -> Value {
  serde_json::from_str(msg.as_text().unwrap()).expect(&format!("Couldn't parse message: {:?}", msg))
}
