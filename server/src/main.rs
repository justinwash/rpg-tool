extern crate env_logger;
extern crate mio_extras;
extern crate time;
extern crate ws;

use std::str::from_utf8;
use time::OffsetDateTime;

use mio_extras::timer::Timeout;

use ws::util::Token;
use ws::{
  listen, CloseCode, Error, ErrorKind, Frame, Handler, Handshake, Message, OpCode, Result, Sender,
};

use serde_json::*;

const PING: Token = Token(1);
const EXPIRE: Token = Token(2);

fn main() {
  env_logger::init();

  listen("127.0.0.1:9001", |out| Server {
    out,
    ping_timeout: None,
    expire_timeout: None,
  })
  .unwrap();
}

struct Server {
  out: Sender,
  ping_timeout: Option<Timeout>,
  expire_timeout: Option<Timeout>,
}

impl Handler for Server {
  fn on_open(&mut self, handshake: Handshake) -> Result<()> {
    println!("New client connection '{:?}'. ", handshake.peer_addr);
    self.out.timeout(5_000, PING)?;
    self.out.timeout(30_000, EXPIRE)
  }

  fn on_message(&mut self, msg: Message) -> Result<()> {
    println!("Server got message '{}'. ", msg);

    let msg_data: Value = serde_json::from_str(msg.as_text().unwrap())
      .expect(&format!("Couldn't parse message: {:?}", msg));

    if msg_data["channel"] == "group" {
      self.out.broadcast(msg)
    } else {
      Ok(())
    }
  }

  fn on_close(&mut self, code: CloseCode, reason: &str) {
    println!("WebSocket closing for ({:?}) {}", code, reason);

    if let Some(t) = self.ping_timeout.take() {
      self.out.cancel(t).unwrap();
    }
    if let Some(t) = self.expire_timeout.take() {
      self.out.cancel(t).unwrap();
    }
  }

  fn on_timeout(&mut self, event: Token) -> Result<()> {
    match event {
      PING => {
        self.out.ping(
          (OffsetDateTime::now_utc().unix_timestamp()
            - OffsetDateTime::unix_epoch().unix_timestamp())
          .to_string()
          .into(),
        )?;
        self.ping_timeout.take();
        self.out.timeout(5_000, PING)
      }
      EXPIRE => self.out.close(CloseCode::Away),
      _ => Err(Error::new(
        ErrorKind::Internal,
        "Invalid timeout token encountered!",
      )),
    }
  }

  fn on_new_timeout(&mut self, event: Token, timeout: Timeout) -> Result<()> {
    if event == EXPIRE {
      if let Some(t) = self.expire_timeout.take() {
        self.out.cancel(t)?
      }
      self.expire_timeout = Some(timeout)
    } else {
      if let Some(t) = self.ping_timeout.take() {
        self.out.cancel(t)?
      }
      self.ping_timeout = Some(timeout)
    }

    Ok(())
  }

  fn on_frame(&mut self, frame: Frame) -> Result<Option<Frame>> {
    if frame.opcode() == OpCode::Pong {
      if !from_utf8(frame.payload())?.parse::<u64>().is_ok() {
        println!("Received bad pong.");
      }
    }

    self.out.timeout(30_000, EXPIRE)?;

    DefaultHandler.on_frame(frame)
  }
}

struct DefaultHandler;

impl Handler for DefaultHandler {}
