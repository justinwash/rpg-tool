pub use self::client::*;
pub use self::group::*;
pub use self::map::*;
pub use self::roll::*;
pub use self::token::*;

pub mod client;
pub mod group;
pub mod map;
pub mod roll;
pub mod token;

use serde_json::*;

pub fn parse_message(msg: &ws::Message) -> Value {
  serde_json::from_str(msg.as_text().unwrap()).expect(&format!("Couldn't parse message: {:?}", msg))
}
