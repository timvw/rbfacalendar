#[macro_use] extern crate rocket;

mod rbfa;
mod calendar;
use rocket::response::content;
use rocket::response::content::*;

#[rocket::main]
#[allow(unused_must_use)]
async fn main() {
    rocket::build()
        .mount("/", routes![index])
        .mount("/", routes![calendar_for_team_id])
        .launch()
        .await;
}

#[get("/")]
fn index() -> content::Html<&'static str> {
    content::Html("<a href='/calendar/22235414'>22235414</a>")
}

#[get("/calendar/<team_id>")]
async fn calendar_for_team_id(team_id: String) -> String {
    let response = rbfa::get_team_calendar(&team_id).await.unwrap();
    format!("{:?}", response)
}

