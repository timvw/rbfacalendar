use chrono::offset::LocalResult;
use chrono::prelude::*;
use serde::de::{self, Deserialize, Deserializer};
use serde::*;

#[derive(Deserialize, Debug)]
pub struct TeamCalendarResponse {
    pub data: TeamCalendarmResponseData,
}

#[derive(Deserialize, Debug)]
pub struct TeamCalendarmResponseData {
    #[serde(rename = "teamCalendar")]
    pub match_details: Vec<MatchDetail>,
}

#[derive(Deserialize, Debug)]
pub struct MatchDetail {
    pub id: String,
    #[serde(rename = "startDate", deserialize_with = "datetime_utc_from_rbfa_date_str")]
    pub start_date: DateTime<Utc>,
    pub channel: String,
    #[serde(rename = "homeTeam")]
    pub home_team: MatchDetailTeam,
    #[serde(rename = "awayTeam")]
    pub away_team: MatchDetailTeam,
}

#[derive(Deserialize, Debug)]
pub struct MatchDetailTeam {
    pub id: String,
    pub name: String,
    #[serde(rename = "clubId")]
    pub club_id: String,
    pub logo: String,
    #[serde(rename = "__typename")]
    pub type_name: String,
}

fn datetime_utc_from_rbfa_date_str<'de, D: Deserializer<'de>>(d: D) -> Result<DateTime<Utc>, D::Error> {
    let result = String::deserialize(d)
        .and_then(|s| NaiveDateTime::parse_from_str(&s, "%Y-%m-%dT%H:%M:%S").map_err(|err| de::Error::custom(err.to_string())))
        .and_then(|ndt| match Utc.from_local_datetime(&ndt) {
            LocalResult::None => Err(de::Error::custom("Could not parse date")),
            LocalResult::Single(dt) => Ok(dt),
            LocalResult::Ambiguous(dt1, dt2) => Err(de::Error::custom(format!("Ambiguous local time, ranging from {:?} to {:?}", dt1, dt2))),
        });

    result
}

#[test]
fn can_parse_datetime_utc_from_rbfa_date_str() {
    use serde::de::value::{Error as ValueError, StrDeserializer};
    use serde::de::IntoDeserializer;
    let deserializer: StrDeserializer<ValueError> = "2021-09-04T01:02:03".into_deserializer();
    assert_eq!(datetime_utc_from_rbfa_date_str(deserializer), Ok(Utc.ymd(2021, 9, 4).and_hms(1, 2, 3)));
    assert_eq!(datetime_utc_from_rbfa_date_str("2021-09-04T01:02:03".into_deserializer() as StrDeserializer<ValueError>), Ok(Utc.ymd(2021, 9, 4).and_hms(1, 2, 3)));
    assert!(datetime_utc_from_rbfa_date_str("2021-09-04T01:02:03X".into_deserializer() as StrDeserializer<ValueError>).is_err());
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

    let team_calendar_response: TeamCalendarResponse = serde_json::from_str(input).expect("Could not parse json");

    assert_eq!(team_calendar_response.data.match_details.len(), 2);
    assert_eq!(team_calendar_response.data.match_details[0].id, "5584787");
    assert_eq!(team_calendar_response.data.match_details[0].start_date, Utc.ymd(2021, 9, 4).and_hms(14, 0, 0));
}

pub async fn get_team_calendar(team_id: &str) -> Result<TeamCalendarResponse, reqwest::Error> {
    let url = format!("https://datalake-prod2018.rbfa.be/graphql?operationName=GetTeamCalendar&variables=%7B%22teamId%22%3A%22{}%22%2C%22language%22%3A%22nl%22%2C%22sortByDate%22%3A%22asc%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22bf4be0c185dee11a27079e529a04d41dc692389ada678dac1f2280e056de7b7d%22%7D%7D", team_id);

    reqwest::get(url)
        .await
        .unwrap()
        .json::<TeamCalendarResponse>()
        .await
}

#[tokio::test]
#[ignore]
async fn can_get_team_calendar() {
    let team_id = "22235414";
    let resp = get_team_calendar(team_id).await;

    assert!(resp.is_ok());
    println!("{:?}", resp.unwrap());
}

#[derive(Deserialize, Debug)]
pub struct ClubTeamsResponse {
    pub data: ClubTeamsResponseData,
}

#[derive(Deserialize, Debug)]
pub struct ClubTeamsResponseData {
    #[serde(rename = "clubTeams")]
    pub club_teams: Vec<Team>,
}

#[derive(Deserialize, Debug)]
pub struct Team {
    pub id: String,
    #[serde(rename = "clubId")]
    pub club_id: String,
    pub name: String,
    pub discipline: String

}

#[test]
fn can_parse_club_teams() {
    let input = r#"
{
    "data": {
        "clubTeams": [
        {
            "id": "215307",
            "clubId": "2725",
            "name": "Eerste Elftallen A",
            "discipline": "Voetbal",
            "__typename": "Team"
        },
        {
            "id": "215306",
            "clubId": "2725",
            "name": "Eerste Elftallen B",
            "discipline": "Voetbal",
            "__typename": "Team"
        }
        ]
    }
}
    "#;

    let club_teams_response: ClubTeamsResponse = serde_json::from_str(input).expect("Could not parse json");

    assert_eq!(club_teams_response.data.club_teams.len(), 2);
    assert_eq!(club_teams_response.data.club_teams[0].id, "215307");
    assert_eq!(club_teams_response.data.club_teams[0].name, "Eerste Elftallen A");
}

pub async fn get_club_teams(club_id: &str) -> Result<ClubTeamsResponse, reqwest::Error> {
    let url = format!("https://datalake-prod2018.rbfa.be/graphql?operationName=getClubTeams&variables=%7B%22clubId%22%3A%22{}%22%2C%22language%22%3A%22nl%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d44e19259679780fe6932644072463997cfe60b66c223d8ba1f53430b0671728%22%7D%7D", club_id);

    reqwest::get(url)
        .await
        .unwrap()
        .json::<ClubTeamsResponse>()
        .await
}

#[tokio::test]
#[ignore]
async fn can_get_club_teams() {
    let club_id = "2725";
    let resp = get_club_teams(club_id).await;

    assert!(resp.is_ok());
    println!("{:?}", resp.unwrap());
}
