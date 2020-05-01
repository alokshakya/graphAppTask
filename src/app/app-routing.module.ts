import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { LoginGuard } from './guards/login.guard';
import { MainGuard } from './guards/main.guard';
const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[LoginGuard]},
  {
    path: 'home',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate:[MainGuard]
  },
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
