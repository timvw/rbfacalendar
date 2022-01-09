#[macro_use] extern crate rocket;

use std::error::Error;
use std::string::ParseError;
use serde::*;
use chrono::prelude::*;
use chrono::ParseResult;
use chrono::offset::LocalResult;
use ics::properties::{Categories, Description, DtEnd, DtStart, Location, Organizer, Status, Summary};
use ics::{escape_text, Event, ICalendar};
use serde::de::{self, Deserialize, Deserializer};

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

fn format_datetime(dt: DateTime<Utc>) -> String {
    dt.format("%Y%m%dT%H%M%SZ").to_string()
}

#[test]
fn can_generate_dtstamp() {
    let dt: DateTime<Utc> = Utc.ymd(2022, 1, 2).and_hms(3, 4, 5);
    assert_eq!(format_datetime(dt), "20220102T030405Z");
}

fn parse_dtstamp(dt: &str) -> ParseResult<DateTime<Utc>> {
    DateTime::parse_from_str(dt, "%Y%m%dT%H%M%SZ")
        .map(|dt| dt.with_timezone(&Utc))
}

fn can_parse_dtstamp() {
    let dt: DateTime<Utc> = Utc.ymd(2022, 1, 2).and_hms(3, 4, 5);
    assert_eq!(parse_dtstamp("20220102T030405Z"), Ok(dt));
}

fn make_event<'a>(uid: &'a str, description: &'a str, start: DateTime<Utc>, end: DateTime<Utc>, location: Option<&'a str>) -> Event<'a> {
    let mut event = Event::new(uid, format_datetime(Utc::now()));
    event.push(DtStart::new(format_datetime(start)));
    event.push(DtEnd::new(format_datetime(end)));
    event.push(Description::new(escape_text(description)));
    match location {
        Some(x) => event.push(Location::new(x)),
        _ => {}
    }
    event
}

fn make_match_event<'a>(description: &'a str, start: DateTime<Utc>, location: Option<&'a str>) -> Event<'a> {
    make_event(description, description, start, start + chrono::Duration::hours(2), location)
}

#[test]
fn can_generate_calendar() {
    let mut calendar = ICalendar::new("2.0", "-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN");

    calendar.add_event(make_match_event(
        "VK.Linden 3 - K.Ol.Wijgmaal B 3",
        Utc.ymd(2022, 1, 8).and_hms(3,2,3),
        Some("Pastoor Bellonstraat 23, 3018 Leuven")));

    calendar.write(std::io::stdout()).expect("Failed to write calendar");
    calendar.save_file("/tmp/test.ics").expect("Failed to save calendar");
}

#[tokio::test]
#[ignore]
async fn can_fetch_team_calendar() {

    let team_id = 22235414;

    let url = format!("https://datalake-prod2018.rbfa.be/graphql?operationName=GetTeamCalendar&variables=%7B%22teamId%22%3A%{}%22%2C%22language%22%3A%22nl%22%2C%22sortByDate%22%3A%22asc%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22bf4be0c185dee11a27079e529a04d41dc692389ada678dac1f2280e056de7b7d%22%7D%7D", team_id);

    let resp = reqwest::get(url)
        .await.unwrap()
        .json::<serde_json::Value>()
        .await.unwrap();

    println!("{:?}", resp);

    assert!(true)
}

#[derive(Deserialize, Debug)]
struct TeamCalendarResponse {
    data: TeamCalendarmResponseData,
}

#[derive(Deserialize, Debug)]
struct TeamCalendarmResponseData {
    #[serde(rename = "teamCalendar")]
    team_calendar: Vec<MatchDetail>,
}

fn datetime_from_rbfa_date_str<'de, D: Deserializer<'de>>(d: D) -> Result<DateTime<Utc>, D::Error>  {

    let result = String::deserialize(d)
        .and_then(|s| NaiveDateTime::parse_from_str(&s, "%Y-%m-%dT%H:%M:%S").map_err(|err| de::Error::custom(err.to_string())))
        .and_then(|ndt| match Utc.from_local_datetime(&ndt) {
            LocalResult::None => Err(de::Error::custom("Could not parse date")),
            LocalResult::Single(dt) => Ok(dt),
            LocalResult::Ambiguous(dt1, dt2) => Err(de::Error::custom("Ambiguous local time, ranging from {:?} to {:?}"))
        });

    result
}

#[derive(Deserialize, Debug)]
struct MatchDetail {
    id: String,
    #[serde(rename = "startDate", deserialize_with = "datetime_from_rbfa_date_str")]
    start_date: DateTime<Utc>,
    channel: String,
    #[serde(rename = "homeTeam")]
    home_team: MatchDetailTeam,
    #[serde(rename = "awayTeam")]
    away_team: MatchDetailTeam,
}

#[derive(Deserialize, Debug)]
struct MatchDetailTeam {
    id: String,
    name: String,
    #[serde(rename = "clubId")]
    club_id: String,
    logo: String,
    #[serde(rename = "__typename")]
    type_name: String,
}

#[test]
fn can_parse_team_calendar() {

    let input = r#"
{
    "data": {
        "teamCalendar": [
            {
                "id": "5584787",
                "startDate": "2021-09-04T14:00:00",
                "channel": "voetbalvlaanderen",
                "homeTeam": {
                    "id": "234947",
                    "name": "KVZ.Glabbeek B 1",
                    "clubId": "2028",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/05806.jpg",
                    "__typename": "MatchDetailTeam"
                },
                "awayTeam": {
                    "id": "235412",
                    "name": "VK.Linden B 2-1",
                    "clubId": "2725",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/08522.jpg",
                    "__typename": "MatchDetailTeam"
                },
                "outcome": {
                    "status": "planned",
                    "homeTeamGoals": null,
                    "homeTeamPenaltiesScored": null,
                    "awayTeamGoals": null,
                    "awayTeamPenaltiesScored": null,
                    "forfeitBy": "",
                    "subscript": null,
                    "__typename": "MatchDetailOutcome"
                },
                "series": {
                    "id": "CHP_99506",
                    "name": "GEW. U12 -I-",
                    "__typename": "MatchSeries"
                },
                "officials": [],
                "__typename": "MatchDetail"
            },
            {
                "id": "5661724",
                "startDate": "2021-09-11T11:30:00",
                "channel": "voetbalvlaanderen",
                "homeTeam": {
                    "id": "237896",
                    "name": "KDN.UNITED",
                    "clubId": "2539",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/07758.jpg",
                    "__typename": "MatchDetailTeam"
                },
                "awayTeam": {
                    "id": "235412",
                    "name": "VK.LINDEN",
                    "clubId": "2725",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/08522.jpg",
                    "__typename": "MatchDetailTeam"
                },
                "outcome": {
                    "status": "planned",
                    "homeTeamGoals": null,
                    "homeTeamPenaltiesScored": null,
                    "awayTeamGoals": null,
                    "awayTeamPenaltiesScored": null,
                    "forfeitBy": "",
                    "subscript": null,
                    "__typename": "MatchDetailOutcome"
                },
                "series": {
                    "id": "FRN_178",
                    "name": "U12",
                    "__typename": "MatchSeries"
                },
                "officials": [],
                "__typename": "MatchDetail"
            }
        ]
    }
}
    "#;

    let resp: TeamCalendarResponse = serde_json::from_str(input).unwrap();
    println!("{:?}", resp);
    println!("start date: {:?}", resp.data.team_calendar.get(1).unwrap().start_date);
}
