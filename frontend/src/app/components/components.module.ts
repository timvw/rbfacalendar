import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material.module";
import {ClubsComponent} from "./clubs/clubs.component";
import {TeamsComponent} from "./teams/teams.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoaderComponent} from "./loader/loader.component";
import { OpenCalendarComponent } from './open-calendar/open-calendar.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ClubsComponent,
    TeamsComponent,
    LoaderComponent,
    OpenCalendarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    PageNotFoundComponent,
    ClubsComponent,
    TeamsComponent,
    LoaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
