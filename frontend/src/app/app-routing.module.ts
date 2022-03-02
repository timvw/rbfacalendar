import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubsComponent } from './components/clubs/clubs.component';
import { TeamsComponent } from './components/teams/teams.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: 'clubs', component: ClubsComponent },
  { path: 'teams/:club_id', component: TeamsComponent },
  //{ path: '',   redirectTo: 'clubs', pathMatch: 'full' }, // redirect to `first-component`
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
