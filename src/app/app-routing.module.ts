import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoggedComponent} from "./logged/logged.component";
import {NotLoggedInGuard} from "./service/not-logged-in-guard.service";
import {LoggedInGuard} from "./service/logged-in-guard.service";

const routes: Routes = [
  {
    path:'', component:HomeComponent, canActivate : [NotLoggedInGuard],
  },
  {
    path:'logged', component:LoggedComponent , canActivate : [LoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
