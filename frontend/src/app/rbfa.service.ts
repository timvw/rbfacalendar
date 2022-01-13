import { Injectable } from '@angular/core';
import { IRbfaService } from './rbfa.service.interface';
import { ClubTeams } from './clubteams';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RbfaService implements IRbfaService {

  private teamsUrl = '/api/club/2725/teams';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ClubTeams> {
    return this.http.get<ClubTeams>(this.teamsUrl);
  }
}
