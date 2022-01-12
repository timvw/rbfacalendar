import { Injectable } from '@angular/core';
import { Team } from './team';
import { TEAMS } from './mock-teams';

@Injectable({
  providedIn: 'root'
})
export class RbfaService {

  constructor() { }

  getTeams(): Promise<Team[]> {
    return Promise.resolve(TEAMS);
  }

}
