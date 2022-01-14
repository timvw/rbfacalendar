import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubsComponent } from './clubs/clubs.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'clubs', component: ClubsComponent },
  { path: 'teams/:club_id', component: TeamsComponent },
  { path: '',   redirectTo: 'clubs', pathMatch: 'full' }, // redirect to `first-component`
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
