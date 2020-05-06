import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { OverlayComponent } from './components/overlay/overlay.component';
import { HeaderComponent } from './components/header/header.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './ngrx/reducers/form-value.reducres';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverlayComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      formValue:reducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
