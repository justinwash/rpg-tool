use crate::models::Session;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ClientMessage {
  pub client_id: String,
  pub username: String,
  pub channel: String,
  pub timestamp: String,
  pub message: String,
  pub session: Option<Session>,
}
