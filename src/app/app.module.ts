import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoggedComponent} from './logged/logged.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from "./service/auth.service";
import {LoggedInGuard} from "./service/logged-in-guard.service";
import {NotLoggedInGuard} from "./service/not-logged-in-guard.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService,
    LoggedInGuard,
    NotLoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
