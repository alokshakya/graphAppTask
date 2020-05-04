import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayInformationComponent } from './display-information/display-information.component';

@NgModule({
  declarations: [HomeComponent, GraphComponent, DashboardComponent, DisplayInformationComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
