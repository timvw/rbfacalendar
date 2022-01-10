#[macro_use]
extern crate rocket;

mod calendar;
mod rbfa;

use rocket::http::ContentType;
use rocket::fs::{FileServer, relative};

#[rocket::main]
#[allow(unused_must_use)]
async fn main() {
    rocket::build()
        .mount("/", routes![calendar_for_team_id])
        .mount("/", FileServer::from(relative!("./webapp/dist/webapp")))
        .launch()
        .await;
}

#[get("/calendar/<team_id>")]
async fn calendar_for_team_id(team_id: String) -> (ContentType, String) {
    let response = rbfa::get_team_calendar(&team_id).await.unwrap();
    let calendar = calendar::make_calendar_from_rbfa_match_details(&response.data.match_details);
    (ContentType::Calendar, format!("{}", calendar))
}
