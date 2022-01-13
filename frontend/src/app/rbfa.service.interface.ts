import { ClubTeams } from './clubteams';
import { Observable } from 'rxjs';

export interface IRbfaService {
  getTeams(): Observable<ClubTeams>;
}
