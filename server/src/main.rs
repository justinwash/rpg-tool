#[macro_use]
extern crate diesel;
pub mod models;
pub mod schema;

extern crate mio_extras;
extern crate time;
extern crate ws;

mod db;
mod message;
mod server;

use tokio::runtime::Runtime;

#[tokio::main]
async fn main() {
  let runtime = Runtime::new().unwrap();
  let http = server::http::server().run(([127, 0, 0, 1], 9002));
  runtime.spawn(http);

  server::socket::start();
}
