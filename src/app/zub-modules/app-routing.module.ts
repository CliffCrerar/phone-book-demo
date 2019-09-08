import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/1_login/login.component';
import { MainComponent } from 'src/app/2_main/main.component';

/* Application Routes */
const routes: Routes = [
  {path: '', redirectTo: '/login',pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'app', component: MainComponent}
];

/* Routing feature module */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
