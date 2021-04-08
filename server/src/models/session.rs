use crate::schema::session;
use serde::{Deserialize, Serialize};
use uuid::*;

#[derive(Queryable, Debug, Deserialize, Serialize, Clone)]
pub struct Session {
  pub id: i32,
  pub uuid: Uuid,
  pub dm: i32,
  pub players: Option<Vec<i32>>,
  pub state: Option<serde_json::Value>,
}

#[derive(Insertable, Debug, Deserialize, Serialize, Clone)]
#[table_name = "session"]
pub struct NewSession {
  pub uuid: Uuid,
  pub dm: i32,
  pub players: Option<Vec<i32>>,
  pub state: Option<serde_json::Value>,
}

pub fn session_from_json(json: &serde_json::Value) -> Session {
  Session {
    id: json["id"].as_i64().unwrap() as i32,
    uuid: Uuid::parse_str(&json["uuid"].to_string()[1..37]).unwrap(),
    dm: json["dm"].as_i64().unwrap() as i32,
    players: match json["players"].as_array() {
      Some(p_vec) => Some(
        p_vec
          .into_iter()
          .map(|p| p.as_i64().unwrap() as i32)
          .collect(),
      ),
      _ => None,
    },
    state: Some(json["state"].clone()),
  }
}
