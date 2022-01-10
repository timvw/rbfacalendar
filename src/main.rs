#[macro_use]
extern crate rocket;

mod calendar;
mod rbfa;

use rocket::http::ContentType;
use rocket::response::content;
use rocket::fs::{FileServer, relative};

#[rocket::main]
#[allow(unused_must_use)]
async fn main() {
    rocket::build()
        .mount("/", routes![index, calendar_for_team_id])
        .mount("/", FileServer::from(relative!("/static/assets")))
        .launch()
        .await;
}

#[get("/")]
fn index() -> content::Html<&'static str> {
    content::Html("<a href='/calendar/22235414'>22235414</a>")
}

#[get("/calendar/<team_id>")]
async fn calendar_for_team_id(team_id: String) -> (ContentType, String) {
    let response = rbfa::get_team_calendar(&team_id).await.unwrap();
    let calendar = calendar::make_calendar_from_rbfa_match_details(&response.data.match_details);
    (ContentType::Calendar, format!("{}", calendar))
}
