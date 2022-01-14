import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { Club } from '../club';
import { RbfaService } from '../rbfa.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  
  clubsControl = new FormControl();

  pclubs: Club[] = [
    { id: '2725', name: 'V.K. LINDEN', logo: 'https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/08522.jpg' },
    { id: '7838', name: 'MVC \'T LINDENHOF', logo: 'https://belgianfootball.s3.eu-central-1.amazonaws.com/s3fs-public/rbfa/img/logos/clubs/no_logo.jpg' }
  ];

  clubs: Observable<Club[]> = of(this.pclubs)

  club: Club = {
    id: '',
    name: '',
    logo: ''
  }

  constructor(@Inject('IRbfaService') private rbfaService: RbfaService) {
    this.clubs = this.clubsControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(val => {
          console.log("switchMap event... val: " + val);
          return rbfaService.searchClubs(val).pipe(
            map(data => data.clubs)
          )
      }) 
    );
  }

  ngOnInit(): void {
  }

}
