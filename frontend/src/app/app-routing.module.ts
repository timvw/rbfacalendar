import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubsComponent } from './clubs/clubs.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'clubs-component', component: ClubsComponent },
  { path: 'teams-component', component: TeamsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
