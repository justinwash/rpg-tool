use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen]
pub fn console_log(message: String) {
  let array = js_sys::Array::new();
  array.push(&message.into());
  web_sys::console::log(&array);
}

#[wasm_bindgen(start)]
pub fn greeting() {
  console_log(format!("Hello from wasm!"));
}

#[wasm_bindgen]
pub fn resize_canvas(width: u32, height: u32) -> Result<(), JsValue> {
  let document = web_sys::window().unwrap().document().unwrap();
  let canvas = document.get_element_by_id("canvas");
  match canvas {
    Some(x) => {
      x.dyn_ref::<web_sys::HtmlCanvasElement>()
        .unwrap()
        .set_width(width);
      x.dyn_ref::<web_sys::HtmlCanvasElement>()
        .unwrap()
        .set_height(height);
      return Ok(());
    }
    None => return Ok(()),
  }
}

#[wasm_bindgen]
pub fn create_canvas() -> Result<(), JsValue> {
  let document = web_sys::window().unwrap().document().unwrap();
  let canvas = document
    .create_element("canvas")?
    .dyn_into::<web_sys::HtmlCanvasElement>()?;
  document.body().unwrap().append_child(&canvas)?;
  canvas.set_width(100);
  canvas.set_height(100);
  canvas.set_id("canvas");
  let context = canvas
    .get_context("2d")?
    .unwrap()
    .dyn_into::<web_sys::CanvasRenderingContext2d>()?;

  let image = web_sys::HtmlImageElement::new().unwrap();

  {
    let img = image.clone();
    let ctx = context.clone();
    let draw_image = Closure::wrap(Box::new(move || {
      ctx
        .draw_image_with_html_image_element_and_dw_and_dh(&img, 0.0, 0.0, 400.0, 800.0)
        .expect("drawing image failed");
    }) as Box<dyn Fn()>);
    image.set_onload(Some(draw_image.as_ref().unchecked_ref()));
    draw_image.forget();
    image.set_src("disco.jpeg");
  }

  console_log(format!("canvas create successful"));

  Ok(())
}
