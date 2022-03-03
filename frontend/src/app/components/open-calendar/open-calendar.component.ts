import {Component, Input, OnInit, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-open-calendar',
  templateUrl: './open-calendar.component.html',
  styleUrls: ['./open-calendar.component.css']
})
export class OpenCalendarComponent implements OnInit {

  @Input() team_id: string = "";

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  get calendar_url(): SafeResourceUrl {
    const url = "webcal://" + window.location.host + "/api/calendar/" + this.team_id;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
