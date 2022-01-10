use crate::rbfa::MatchDetail;
use chrono::{DateTime, Utc};
use ics::properties::{Description, DtEnd, DtStart, Summary};
use ics::{escape_text, Event, ICalendar};

fn format_as_dtstamp(dt: DateTime<Utc>) -> String {
    dt.format("%Y%m%dT%H%M%SZ").to_string()
}

#[test]
fn can_format_as_dtstamp() {
    use chrono::prelude::*;
    assert_eq!(
        format_as_dtstamp(Utc.ymd(2022, 1, 2).and_hms(3, 4, 5)),
        "20220102T030405Z"
    );
}

fn make_match_detail_event(match_detail: &MatchDetail) -> Event<'_> {
    let mut event = Event::new(&match_detail.id, format_as_dtstamp(Utc::now()));
    event.push(DtStart::new(format_as_dtstamp(match_detail.start_date)));
    event.push(DtEnd::new(format_as_dtstamp(
        match_detail.start_date + chrono::Duration::hours(2),
    )));
    event.push(Summary::new(escape_text(format!(
        "{} - {}",
        match_detail.home_team.name, match_detail.away_team.name
    ))));
    event.push(Description::new(escape_text(format!(
        "{} - {}",
        match_detail.home_team.name, match_detail.away_team.name
    ))));
    event
}

pub fn make_calendar_from_rbfa_match_details(match_details: &Vec<MatchDetail>) -> ICalendar {
    let mut calendar = ICalendar::new("2.0", "-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN");
    for match_detail in match_details {
        calendar.add_event(make_match_detail_event(&match_detail));
    }
    calendar
}
