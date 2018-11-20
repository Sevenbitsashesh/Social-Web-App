import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsertabsPage } from './usertabs.page';
import { TabRoutingmodule } from './tabs-routing.module';
import { UserhomeComponent } from '../userhome/userhome.component';
import { UsersettingComponent } from '../usersetting/usersetting.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRoutingmodule
  ],
  declarations: [UsertabsPage, UserhomeComponent, UsersettingComponent],
  bootstrap: [UsertabsPage]
})
export class UsertabsPageModule {}
