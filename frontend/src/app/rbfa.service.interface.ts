import { ClubTeams } from './clubteams';
import { Clubs } from './clubs';
import { Observable } from 'rxjs';

export interface IRbfaService {
  getTeams(): Observable<ClubTeams>;
  searchClubs(search_term: String): Observable<Clubs>;
}
