use crate::schema::session;
use serde::{Deserialize, Serialize};
use uuid::*;

#[derive(Queryable, Debug, Clone)]
pub struct Session {
  pub id: i32,
  uuid: Uuid,
  dm: i64,
  players: Option<Vec<i32>>,
  state: Option<serde_json::Value>,
}

#[derive(Insertable, Debug, Deserialize, Serialize, Clone)]
#[table_name = "session"]
pub struct NewSession {
  uuid: Uuid,
  dm: i64,
  players: Option<Vec<i32>>,
  state: Option<serde_json::Value>,
}
