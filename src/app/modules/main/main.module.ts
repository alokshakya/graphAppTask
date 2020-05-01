import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, GraphComponent, DashboardComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
