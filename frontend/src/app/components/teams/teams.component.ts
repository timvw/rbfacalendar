import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Inject } from '@angular/core';
import { RbfaService } from '../../services/rbfa.service';
import { Team } from '../../models/team';
import { ClubTeams } from '../../models/clubteams';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [ RbfaService ]
})
export class TeamsComponent implements OnInit {
  
  constructor(
    @Inject('IRbfaService') private rbfaService: RbfaService, 
    private route: ActivatedRoute
  ) {}

  teams: Team[] = [];
  
  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const clubIdFromRoute = routeParams.get('club_id') || "";
    this.getTeams(clubIdFromRoute);
  }

  getTeams(club_id: string): void {
    this.rbfaService.getTeams(club_id).subscribe((clubTeams: ClubTeams) => this.teams = clubTeams.teams);
  }
}
