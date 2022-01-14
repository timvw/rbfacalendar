import { Injectable } from '@angular/core';
import { RbfaService } from '../rbfa.service';
import { ClubTeams } from '../clubteams';
import { TEAMS } from './mock-teams';
import { Clubs } from '../clubs';
import { CLUBS } from './mock-clubs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockRbfaService extends RbfaService {

  override getTeams(): Observable<ClubTeams> {
    const clubTeams: ClubTeams = {
      teams: TEAMS
    }
    return of(clubTeams);
  }

  override searchClubs(search_term: String): Observable<Clubs> {
    console.log("searching clubs with search term: " + search_term);
    var filteredClubs = CLUBS.filter(club => club.name.toLowerCase().indexOf(search_term.toLowerCase()) > -1);
    const clubs: Clubs = {
      clubs: filteredClubs
    }
    return of(clubs);
  }
}
