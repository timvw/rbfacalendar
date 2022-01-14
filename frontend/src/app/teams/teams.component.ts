import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { RbfaService } from '../rbfa.service';
import { Team } from '../team';
import { ClubTeams } from '../clubteams';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [ RbfaService ]
})
export class TeamsComponent implements OnInit {
  
  constructor(@Inject('IRbfaService') private rbfaService: RbfaService) {}

  teams: Team[] = [];
  
  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.rbfaService.getTeams().subscribe((clubTeams: ClubTeams) => this.teams = clubTeams.teams);
  }
}
