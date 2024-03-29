import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import 'hammerjs'; 
import 'mousetrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ModalGalleryModule.forRoot()
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
