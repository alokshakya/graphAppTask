import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';



@NgModule({
  declarations: [HomeComponent, GraphComponent],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
