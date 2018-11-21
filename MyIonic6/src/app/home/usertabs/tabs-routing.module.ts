import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsertabsPage } from './usertabs.page';
import { UserhomeComponent } from '../userhome/userhome.component';
import { UsersettingComponent } from '../usersetting/usersetting.component';
import { HomePage } from './home.page';


const routes: Routes = [
  { path: 'tabs', component: UsertabsPage, children: [
    {
      path: 'home_tab',
      outlet: 'home_tab',
      component: UserhomeComponent
    },
    {
      path: 'setting_tab',
      outlet: 'setting_tab',
      component: UsersettingComponent
    }
  ]
},
// {
//   path: '',
//   redirectTo: '/tabs/(home_tab:home_tab)',
//   pathMatch: 'full'
// },
{path: 'home', component: HomePage },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TabRoutingmodule { }
