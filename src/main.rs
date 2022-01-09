#[macro_use] extern crate rocket;

mod rbfa;

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

