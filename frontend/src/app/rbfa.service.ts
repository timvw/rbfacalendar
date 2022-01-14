import { Injectable } from '@angular/core';
import { IRbfaService } from './rbfa.service.interface';
import { ClubTeams } from './clubteams';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Club } from './club';
import { Clubs } from './clubs';

@Injectable({
  providedIn: 'root'
})
export class RbfaService implements IRbfaService {

  private teamsUrl = '/api/club/2725/teams';
  private clubsUrl = '/api/clubs?q=';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ClubTeams> {
    return this.http.get<ClubTeams>(this.teamsUrl);
  }

  searchClubs(search_term: string): Observable<Clubs> {
      console.log("searching clubs with search term: " + search_term);
      return this.http.get<Clubs>(this.clubsUrl + encodeURIComponent(search_term));
  }
}
