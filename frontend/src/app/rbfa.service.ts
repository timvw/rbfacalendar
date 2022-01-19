import { Injectable } from '@angular/core';
import { IRbfaService } from './rbfa.service.interface';
import { ClubTeams } from './clubteams';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Club } from './club';
import { Clubs } from './clubs';

@Injectable({
  providedIn: 'root'
})
export class RbfaService implements IRbfaService {

  private teamsUrl = '/api/club/';
  private clubsUrl = '/api/clubs';
  private clubs: Set<Club> = new Set<Club>();

  constructor(private http: HttpClient) { }

  getTeams(club_id: string): Observable<ClubTeams> {
    var url = this.teamsUrl + encodeURIComponent(club_id) + '/teams';
    console.log("searching teams with url: " + url);
    return this.http.get<ClubTeams>(url);
  }

  searchClubs(search_term: string): Observable<Clubs> {
    const options = search_term ? { params: new HttpParams().set('q', search_term) } : {};
    return this.http.get<Clubs>(this.clubsUrl, options);
  }
}
