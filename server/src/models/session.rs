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
