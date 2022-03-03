import { Injectable } from '@angular/core';
import { RbfaService } from '../services/rbfa.service';
import { ClubTeams } from '../models/clubteams';
import { TEAMS } from './mock-teams';
import { Clubs } from '../models/clubs';
import { Club } from '../models/club';
import { CLUBS } from './mock-clubs';
import { Observable, of } from 'rxjs';
import {Team} from "../models/team";

@Injectable({
  providedIn: 'root'
})
export class MockRbfaService extends RbfaService {

  override getTeams(club_id: String): Observable<ClubTeams> {

    const clubTeams: ClubTeams = {
      teams: TEAMS.map(x => {
        return { ...x, name: club_id + ":" + x.name}
      })
    }
    return of(clubTeams);
  }

  override searchClubs(search_term: String): Observable<Clubs> {
    console.log("searching clubs with search term: " + search_term);

    var filteredClubs: Club[];
    if (!search_term || search_term.length < 1) {
      filteredClubs = [];
    } else {
      filteredClubs = CLUBS.filter(club => club.name.toLowerCase().indexOf(search_term.toLowerCase()) > -1);
    }

    const clubs: Clubs = {
      clubs: filteredClubs
    }

    return of(clubs);
  }
}
