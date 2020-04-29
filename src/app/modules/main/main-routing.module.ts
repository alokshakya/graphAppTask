import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [

  {path:'', component: HomeComponent, children:[
    {path:'graph', component: GraphComponent},
    {path:'', redirectTo:'graph', pathMatch:'full'}
  ]},
  {path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }