import { ClubTeams } from '../models/clubteams';
import { Clubs } from '../models/clubs';
import { Observable } from 'rxjs';

export interface IRbfaService {
  getTeams(club_id: string): Observable<ClubTeams>;
  searchClubs(search_term: String): Observable<Clubs>;
}
