import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import {FullscreenOverlayContainer, OverlayContainer} from "@angular/cdk/overlay";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    { provide: 'IRbfaService', useClass: environment.rbfaService },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
