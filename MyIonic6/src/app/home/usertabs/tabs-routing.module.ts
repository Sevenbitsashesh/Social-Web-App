import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsertabsPage } from './usertabs.page';
import { UserhomeComponent } from '../userhome/userhome.component';
import { UsersettingComponent } from '../usersetting/usersetting.component';
import { HomePage } from './home.page';
import { SearchComponent } from '../search/search.component';
import { ProfileviewComponent } from '../profileview/profileview.component';
import { SearchviewComponent } from '../searchview/searchview.component';
import { ViewPageModule } from '../view/view.module';

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
    },
    {
      path: 'view_tab',
      outlet: 'view_tab',
      loadChildren: '../view/view.module#ViewPageModule'
    },
    {
      path: 'search_tab',
      outlet: 'search_tab',
       component: SearchComponent,
    },
    { path: 'profileview', component: ProfileviewComponent},
 { path: 'searchview', component: SearchviewComponent},
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
