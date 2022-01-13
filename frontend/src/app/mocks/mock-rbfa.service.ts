import { Injectable } from '@angular/core';
import { RbfaService } from '../rbfa.service';
import { ClubTeams } from '../clubteams';
import { TEAMS } from './mock-teams';
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
}
