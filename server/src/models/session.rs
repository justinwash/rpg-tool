use crate::schema::session;
use serde::{Deserialize, Serialize};
use uuid::*;

#[derive(Queryable, Debug, Clone)]
pub struct Session {
  pub id: i32,
  uuid: Uuid,
  dm: i64,
  players: Option<Vec<i64>>,
  state: Option<serde_json::Value>,
}

#[derive(Insertable, Debug, Deserialize, Serialize, Clone)]
#[table_name = "session"]
pub struct NewSession {
  pub uuid: Uuid,
  pub dm: i64,
  pub players: Option<Vec<i64>>,
  pub state: Option<serde_json::Value>,
}
