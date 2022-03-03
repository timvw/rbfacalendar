import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material.module";
import {ClubsComponent} from "./clubs/clubs.component";
import {TeamsComponent} from "./teams/teams.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


@NgModule({
  declarations: [
      HomeComponent,
      PageNotFoundComponent,
      ClubsComponent,
      TeamsComponent
  ],
  imports: [
      CommonModule,
      MaterialModule
  ],
  exports: [
      HomeComponent,
      PageNotFoundComponent,
      ClubsComponent,
      TeamsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }