import { Component } from '@angular/core';
import { RbfaService } from './rbfa.service';
import { ClubTeams, Team } from './team';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RbfaService]
})
export class AppComponent {
  title = 'frontend';
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  teams: Team[] = [];

  constructor(private rbfaService: RbfaService) { }
 
 ngOnInit(): void {
    this.getStudents();
  }
  getStudents(): void {
    this.rbfaService.getTeams().subscribe((clubTeams: ClubTeams) => this.teams = clubTeams.teams);
  }
}
