#[macro_use]
extern crate rocket;

mod calendar;
mod rbfa;

use rocket::http::ContentType;
use rocket::fs::{FileServer, relative};
use rocket::serde::{Serialize, json::Json};
use std::io::Write;
use chrono::Local;
use env_logger::Builder;
use log::LevelFilter;

#[rocket::main]
#[allow(unused_must_use)]
async fn main() {

    Builder::new()
        .format(|buf, record| {
            writeln!(buf,
                     "{} [{}] - {}",
                     Local::now().format("%Y-%m-%dT%H:%M:%S"),
                     record.level(),
                     record.args()
            )
        })
        .filter(None, LevelFilter::Info)
        .init();

    rocket::build()
        .mount("/", FileServer::from(relative!("../frontend/dist/frontend")))
        .mount("/api", routes![get_club_teams, search_clubs, calendar_for_team_id])
        .launch()
        .await;
}

#[get("/calendar/<team_id>?<title>")]
async fn calendar_for_team_id(team_id: String, title: String) -> (ContentType, String) {
    println!("team_id: {} title: {}", team_id, title);
    let response = rbfa::get_team_calendar(&team_id).await.unwrap();
    let calendar = calendar::make_calendar_from_rbfa_match_details(title, &response.data.match_details);
    (ContentType::Calendar, format!("{}", calendar))
}

#[get("/club/<club_id>/teams")]
pub async fn get_club_teams(club_id: String) -> Json<GetTeamsResponse> {
    let rbfa_club_teams = rbfa::get_club_teams(&club_id).await.unwrap();
    let teams = rbfa_club_teams.data.club_teams.into_iter().map(|team| Team {
        team_id: team.id,
        name: team.name,
    }).collect();
    Json(GetTeamsResponse {teams,})
}

#[derive(Serialize, Debug)]
pub struct GetTeamsResponse {
    pub teams: Vec<Team>,
}

#[derive(Serialize, Debug)]
pub struct Team {
    pub team_id: String,
    pub name: String,
}

#[get("/clubs?<q>")]
pub async fn search_clubs(q: &str) -> Json<SearchClubsResponse> {
    
    if q.len() < 2 {
        return Json(SearchClubsResponse {clubs: vec![]});
    }

    let rbfa_clubs = rbfa::search_clubs(q)
        .await
        .unwrap();
    let clubs = rbfa_clubs.data.search.results
        .unwrap_or_default()
        .into_iter().map(|club| Club {
            id: club.id,
            name: club.club_name,
            logo: club.logo,
        })
        .collect();
    Json(SearchClubsResponse {clubs,})
}

#[derive(Serialize, Debug)]
pub struct SearchClubsResponse {
    pub clubs: Vec<Club>,
}

#[derive(Serialize, Debug)]
pub struct Club {
    pub id: String,
    pub name: String,
    pub logo: String
}
