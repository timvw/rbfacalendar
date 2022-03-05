import {Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Team} from "../../models/team";
import {Club} from "../../models/club";

@Component({
  selector: 'app-open-calendar',
  templateUrl: './open-calendar.component.html',
  styleUrls: ['./open-calendar.component.css']
})
export class OpenCalendarComponent {

  @Input() club!: Club;
  @Input() team!: Team;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  calculateTitle() {
    return this.club.name + " - " + this.team.name;
  }

  get calendarUrl(): SafeResourceUrl {
    const url = new URL("webcal://" + window.location.host + "/api/calendar/" + encodeURIComponent(this.team.team_id));
    url.searchParams.append("title", this.calculateTitle());
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.href);
  }

}
