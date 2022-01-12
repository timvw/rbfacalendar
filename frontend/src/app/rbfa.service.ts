import { Injectable } from '@angular/core';
import { ClubTeams, Team } from './team';
import { TEAMS } from './mock-teams';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RbfaService {

  constructor(private http: HttpClient) { }

  teamsUrl = '/api/club/2725/teams'

  getTeams() {
    return this.http.get<ClubTeams>(this.teamsUrl);
  }
}
