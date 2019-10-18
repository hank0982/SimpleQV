import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SummaryComponent } from './summary/summary.component';
import { OptionComponent } from './option/option.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProgressbarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
