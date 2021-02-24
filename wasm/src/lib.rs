use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_two_ints(a: u32, b: u32) -> u32 {
   a + b
}

#[wasm_bindgen]
pub fn fib(n: u32) -> u32 {
   if n == 0 || n == 1 {
      return n;
   }
   fib(n - 1) + fib(n - 2)
}

#[wasm_bindgen]
pub fn console_log(message: &str) {
   let array = js_sys::Array::new();
   array.push(&message.into());
   web_sys::console::log(&array);
}

#[wasm_bindgen]
pub fn main() {
   use dragula::*;

   let doc = web_sys::window().unwrap().document().unwrap();
   console_log(&doc.title());
   //let element = doc.get_element_by_id("drag-container").unwrap();

   // let drake = dragula(&[element]);

   console_log("Hello from wasm!");
}
