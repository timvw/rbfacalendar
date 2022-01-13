# Samples of source data fetching

## Finding clubs

https://datalake-prod2018.rbfa.be/graphql?operationName=DoSearch&variables=%7B%22first%22%3A10%2C%22offset%22%3A0%2C%22filter%22%3A%7B%22query%22%3A%22LINDEN%22%2C%22type%22%3A%22club%22%7D%2C%22language%22%3A%22nl%22%2C%22channel%22%3A%22voetbalvlaanderen%22%2C%22location%22%3A%22BE%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22c120b8966cc8f35c5057d149b6071938f597909486fa820b2e8385a50a5dd938%22%7D%7D


```json
{
    "data": {
        "search": {
            "results": [
                {
                    "id": "2725",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/08522.jpg",
                    "clubName": "V.K. LINDEN",
                    "registrationNumber": "08522",
                    "__typename": "ClubSearchResult"
                },
                {
                    "id": "7838",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/no_logo.jpg",
                    "clubName": "MVC 'T LINDENHOF",
                    "registrationNumber": "M89213",
                    "__typename": "ClubSearchResult"
                },
                {
                    "id": "4046",
                    "logo": "https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/23517.jpg",
                    "clubName": "FORTUNA LINDENHOF ZUTENDAAL",
                    "registrationNumber": "A23517",
                    "__typename": "ClubSearchResult"
                }
            ],
            "pageInfo": {
                "size": 3,
                "offset": 0,
                "total": 3,
                "__typename": "PageInfo"
            },
            "filter": {
                "type": [
                    {
                        "name": "team",
                        "count": 25,
                        "__typename": "AggregationBucket"
                    },
                    {
                        "name": "interplayer",
                        "count": 11,
                        "__typename": "AggregationBucket"
                    },
                    {
                        "name": "club",
                        "count": 3,
                        "__typename": "AggregationBucket"
                    },
                    {
                        "name": "information",
                        "count": 1,
                        "__typename": "AggregationBucket"
                    }
                ],
                "__typename": "SearchAggregation"
            },
            "__typename": "Search"
        }
    }
}
```

## Fetching teams in a club
https://datalake-prod2018.rbfa.be/graphql?operationName=getClubTeams&variables=%7B%22clubId%22%3A%222725%22%2C%22language%22%3A%22nl%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d44e19259679780fe6932644072463997cfe60b66c223d8ba1f53430b0671728%22%7D%7D


```json
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
```

## Fetching team calendar

https://datalake-prod2018.rbfa.be/graphql?operationName=GetTeamCalendar
&variables=%7B%22teamId%22%3A%22235414%22%2C%22language%22%3A%22nl%22%2C%22sortByDate%22%3A%22asc%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22bf4be0c185dee11a27079e529a04d41dc692389ada678dac1f2280e056de7b7d%22%7D%7D


```json
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
```