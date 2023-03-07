import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoinsComponent} from './coins/coins.component';
import {DrinksComponent} from './drinks/drinks.component';
import { StatusComponent } from './status/status.component';
import {VendingService} from "./vending.service";


@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    DrinksComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VendingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
