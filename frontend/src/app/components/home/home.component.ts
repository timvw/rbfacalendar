import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Team} from "../../models/team";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {ClubsComponent} from "../clubs/clubs.component";
import {RbfaService} from "../../services/rbfa.service";
import {LoaderService} from "../../services/loader.service";
import {delay} from "rxjs";
import {TeamsComponent} from "../teams/teams.component";
import {Club} from "../../models/club";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild("c") c!: ClubsComponent;
  @ViewChild("t") t!: TeamsComponent;

  constructor(
    @Inject('IRbfaService') private rbfaService: RbfaService,
    private loaderService: LoaderService,
  ) { }

  club: Club = {
    id: '',
    name: '',
    logo: '',
  };

  team: Team = {
    team_id: '',
    name: '',
  };

  teams: Team[] = [];

  onSelectionChange(event: StepperSelectionEvent) {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      this.club = this.c.form.value.club;
      this.loaderService.updateIsLoading(true);
      this.rbfaService.getTeams(this.club.id)
        //.pipe(delay(2000))
        .subscribe(data => {
          this.teams = data.teams;
          this.loaderService.updateIsLoading(false);
        })
    } else if (event.previouslySelectedIndex == 1 && event.selectedIndex == 2) {
      this.team = this.t.form.value.team;
    }
  }
}
