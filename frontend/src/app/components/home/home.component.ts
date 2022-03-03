import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Team} from "../../models/team";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {ClubsComponent} from "../clubs/clubs.component";
import {RbfaService} from "../../services/rbfa.service";
import {LoaderService} from "../../services/loader.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild("c") c!: ClubsComponent;

  constructor(
    @Inject('IRbfaService') private rbfaService: RbfaService,
    private loaderService: LoaderService,
  ) { }

  teams: Team[] = [];

  onSelectionChange(event: StepperSelectionEvent) {

    if(event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      const clubId = this.c.form.value.club.id;
      this.loaderService.updateIsLoading(true);
      this.rbfaService.getTeams(clubId)
        //.pipe(delay(2000))
        .subscribe(data => {
        this.teams = data.teams;
        this.loaderService.updateIsLoading(false);
      })
    }
  }

}
