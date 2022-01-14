import { ClubTeams } from './clubteams';
import { Clubs } from './clubs';
import { Observable } from 'rxjs';

export interface IRbfaService {
  getTeams(club_id: string): Observable<ClubTeams>;
  searchClubs(search_term: String): Observable<Clubs>;
}
