import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';

import { Club } from '../../models/club';
import { RbfaService } from '../../services/rbfa.service';
import {isObjectValidator} from "../../is-object.validator";

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  form = new FormGroup({
    club: new FormControl('', [Validators.required, isObjectValidator() ]),
  });

  clubs: Observable<Club[]>;

  constructor(
    @Inject('IRbfaService') private rbfaService: RbfaService,
    private router: Router
    ) {
    this.clubs = this.form.controls['club'].valueChanges.pipe(
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
}
