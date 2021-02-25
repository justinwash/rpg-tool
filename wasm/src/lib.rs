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
   let canvas = get_canvas(get_document());
   let context = get_2d_context(&canvas);

   canvas.set_width(width);
   canvas.set_height(height);

   draw(canvas, context);
   return Ok(());
}

#[wasm_bindgen]
pub fn scale_canvas(dir: f64, focus_x: f64, focus_y: f64) -> Result<(), JsValue> {
   let canvas = get_canvas(get_document());
   let context = get_2d_context(&canvas);
   let factor = if dir.is_sign_positive() { 0.95 } else { 1.05 };
   context.translate(focus_x, focus_y).unwrap();
   context.scale(factor, factor).unwrap();
   context.translate(focus_x * -1.0, focus_y * -1.0).unwrap();
   draw(canvas, context);
   return Ok(());
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

   {
      let closure = Closure::wrap(Box::new(move |event: web_sys::WheelEvent| {
         scale_canvas(
            event.delta_y(),
            event.offset_x().into(),
            event.offset_y().into(),
         )
         .unwrap();
      }) as Box<dyn FnMut(_)>);
      let canvas = get_canvas(document);
      canvas.add_event_listener_with_callback("wheel", closure.as_ref().unchecked_ref())?;
      closure.forget();
   }

   draw(canvas, context);

   console_log(format!("canvas create successful"));

   Ok(())
}

pub fn draw(canvas: web_sys::HtmlCanvasElement, context: web_sys::CanvasRenderingContext2d) {
   let image = web_sys::HtmlImageElement::new().unwrap();

   let img = image.clone();
   let ctx = context.clone();
   let draw_image = Closure::wrap(Box::new(move || {
      ctx.draw_image_with_html_image_element_and_dw_and_dh(
         &img,
         0.0,
         0.0,
         (img.width() / (img.height() / canvas.height())).into(),
         canvas.height().into(),
      )
      .expect("drawing image failed");
   }) as Box<dyn Fn()>);
   image.set_onload(Some(draw_image.as_ref().unchecked_ref()));
   draw_image.forget();
   image.set_src("disco.jpeg");
}

pub fn get_document() -> web_sys::Document {
   web_sys::window().unwrap().document().unwrap()
}

pub fn get_canvas(document: web_sys::Document) -> web_sys::HtmlCanvasElement {
   document
      .get_element_by_id("canvas")
      .unwrap()
      .dyn_into::<web_sys::HtmlCanvasElement>()
      .unwrap()
}

pub fn get_2d_context(canvas: &web_sys::HtmlCanvasElement) -> web_sys::CanvasRenderingContext2d {
   canvas
      .dyn_ref::<web_sys::HtmlCanvasElement>()
      .unwrap()
      .get_context("2d")
      .unwrap()
      .unwrap()
      .dyn_into::<web_sys::CanvasRenderingContext2d>()
      .unwrap()
}
