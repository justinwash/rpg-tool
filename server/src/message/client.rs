use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
pub struct ClientMessage {
  pub client_id: String,
  pub username: String,
  pub channel: String,
  pub timestamp: String,
  pub message: String,
  pub session: Option<Uuid>,
}
