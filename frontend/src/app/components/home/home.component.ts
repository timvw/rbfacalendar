import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Team} from "../../models/team";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {ClubsComponent} from "../clubs/clubs.component";
import {RbfaService} from "../../services/rbfa.service";
import {LoaderService} from "../../services/loader.service";
import {delay} from "rxjs";
import {TeamsComponent} from "../teams/teams.component";

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

  teams: Team[] = [];
  team_id: string = '';

  onSelectionChange(event: StepperSelectionEvent) {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      const clubId = this.c.form.value.club.id;
      this.loaderService.updateIsLoading(true);
      this.rbfaService.getTeams(clubId)
        //.pipe(delay(2000))
        .subscribe(data => {
          this.teams = data.teams;
          this.loaderService.updateIsLoading(false);
        })
    } else if (event.previouslySelectedIndex == 1 && event.selectedIndex == 2) {
      const team_id = this.t.form.value.team.team_id;
      this.team_id = team_id;
    }
  }
}
