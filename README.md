# rpg-tool

A multiplayer rpg mapping tool

## Setup

- Install Node and NPM
- Install Rust

  `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

- Install wasm-pack

  `cargo install wasm-pack`

- Clone this repo

  `git clone http://www.github.com/justinwash/rpg-tool`

- cd into rpg-tool/wasm and run `wasm-pack build`

  | Chances are high you'll run into some issues here if you've never worked with rust before.Things like `xcode-tools` or `make` not being installed, etc. Google the error messages until it compiles successfully (or ask me for help).

- cd into rpg-tool/client and run `npm install`

- start up the react client with `npm start`

## Development

When working you won't want to have to recompile your wasm manually every time you make a change.

Install the watch command for Cargo

`cargo install cargo-watch`

Then when starting up the project run (in two separate terminal tabs)

`npm start` in /client

`cargo watch -i .gitignore -i "pkg/*" -s "wasm-pack build"` in /wasm

This tells cargo to recompile your wasm project on save, and since npm sym-links to the /wasm/pkg directory it will also trigger a refresh of the react dev server and refresh your browser
