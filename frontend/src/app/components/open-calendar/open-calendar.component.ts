import {Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Team} from "../../models/team";
import {Club} from "../../models/club";

@Component({
  selector: 'app-open-calendar',
  templateUrl: './open-calendar.component.html',
  styleUrls: ['./open-calendar.component.css']
})
export class OpenCalendarComponent implements OnInit, OnChanges {

  @Input() club!: Club;
  @Input() team!: Team;

  title: string = '';
  calendar_url: SafeResourceUrl = '';

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.assignData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.assignData()
  }

  assignData() {
    this.title = this.calculateTitle();
    this.calendar_url = this.calculateCalendarUrl();
  }

  calculateTitle() {
    return this.club.name + " - " + this.team.name;
  }

  calculateCalendarUrl(): SafeResourceUrl {
    const url = new URL("webcal://" + window.location.host + "/api/calendar/" + encodeURIComponent(this.team.team_id));
    url.searchParams.append("title", this.title);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.href);
  }

}
