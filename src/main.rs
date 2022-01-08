#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[rocket::main]
#[allow(unused_must_use)]
async fn main() {
    rocket::build()
        .mount("/", routes![index])
        .launch()
        .await;
}
