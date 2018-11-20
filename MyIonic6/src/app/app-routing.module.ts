import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../app/home/home.page';
import { PageNotFoundComponent } from '..//app/page-not-found/page-not-found.component';
import { UserDetails } from './models/user_model';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from '../app/home/create/create.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePage },
  {path: 'create', component: CreateComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
