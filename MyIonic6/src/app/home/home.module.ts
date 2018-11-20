import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from './home.page';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsersettingComponent } from './usersetting/usersetting.component';
import { UsertabsPageModule } from './usertabs/usertabs.module';
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsertabsPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [UserhomeComponent, UsersettingComponent],
  exports: [ UserhomeComponent ]
})
export class HomePageModule {

}
