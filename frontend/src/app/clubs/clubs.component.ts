import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';

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

  clubs: Observable<Club[]>;

  constructor(
    @Inject('IRbfaService') private rbfaService: RbfaService,
    private router: Router
    ) {
    this.clubs = this.clubsControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(val => {
          if (!val || val.length < 1 || typeof val !== 'string') { return this.clubs; }
          console.log("switchMap event... val: " + val);
          return rbfaService.searchClubs(val).pipe(
            map(data => data.clubs)
          )
      }) 
    );
  }

  ngOnInit(): void { }

  displayFn(club: Club): string {
    return club && club.name ? club.name : '';
  }


  onClubSelected(item: any): void {
    console.log("onSelect event... club, name: " + item.option.value.name + ", id: " + item.option.value.id);
    this.router.navigate(['teams', item.option.value.id]);
  }

}
