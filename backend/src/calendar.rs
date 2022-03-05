use crate::rbfa::MatchDetail;
use chrono::{Utc, NaiveDateTime};
use ics::properties::{Description, DtEnd, DtStart, Name, Summary, TzID};
use ics::{escape_text, Event, ICalendar};
use ics::components::Property;

fn format_as_dtstamp(dt: NaiveDateTime) -> String {
    dt.format("%Y%m%dT%H%M%S").to_string()
}

#[test]
fn can_format_as_dtstamp() {
    use chrono::NaiveDate;
    assert_eq!(format_as_dtstamp(NaiveDate::from_ymd(2022, 1, 2).and_hms(3, 4, 5)), "20220102T030405");
}

fn make_match_detail_event(match_detail: &MatchDetail) -> Event<'_> {
    let mut event = Event::new(&match_detail.id, format_as_dtstamp(Utc::now().naive_utc()));
    event.push(DtStart::new(format_as_dtstamp(match_detail.start_date)));
    event.push(DtEnd::new(format_as_dtstamp(match_detail.start_date + chrono::Duration::hours(2))));
    event.push(Summary::new(escape_text(format!("{} - {}", match_detail.home_team.name, match_detail.away_team.name))));
    event.push(Description::new(escape_text(format!("{} - {}", match_detail.home_team.name, match_detail.away_team.name))));
    event
}

pub fn make_calendar_from_rbfa_match_details(title: String, match_details: &Vec<MatchDetail>) -> ICalendar {
    let mut calendar = ICalendar::new("2.0", "-//timvw.be//RBFACALENDAR//EN");

    let timezone = "Europe/Brussels";
    calendar.push(TzID::new(timezone));
    calendar.push(Property::new("TIMEZONE-ID", timezone));
    calendar.push(Property::new("X-WR-TIMEZONE", timezone));

    calendar.push(Name::new(title.clone()));
    calendar.push(Property::new("X-WR-CALNAME", title));

    let description = "Alle wedstrijden volgens RBFA";
    calendar.push(Description::new(description));
    calendar.push(Property::new("X-WR-CALDESC", description));

    for match_detail in match_details {
        calendar.add_event(make_match_detail_event(&match_detail));
    }
    calendar
}

#[test]
#[ignore]
fn can_make_calendar_from_rbfa_match_details() {

    use chrono::NaiveDate;
    use crate::rbfa::MatchDetailTeam;

    let match_details = vec![
        MatchDetail {
            id: "1".to_string(),
            start_date: NaiveDate::from_ymd(2022, 1, 15).and_hms(12, 0, 0),
            channel: "meh".to_string(),
            home_team: MatchDetailTeam {
                id: "1".to_string(),
                name: "Home".to_string(),
                club_id: None,
                logo: None,
                type_name: "MatchDetailTeam".to_string(),
            },
            away_team: MatchDetailTeam {
                id: "2".to_string(),
                name: "Away".to_string(),
                club_id: None,
                logo: None,
                type_name: "MatchDetailTeam".to_string(),
            },
        },
    ];

    let calendar = make_calendar_from_rbfa_match_details("test".to_string(), &match_details);
    calendar.save_file("/tmp/test.ics").expect("failed to save calendar to /tmp/test.ics");
    use std::process::Command;
    Command::new("open").arg("/tmp/test.ics").spawn().expect("failed to open /tmp/test.ics");
}
