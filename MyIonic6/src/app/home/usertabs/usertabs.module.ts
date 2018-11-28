import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsertabsPage } from './usertabs.page';
import { TabRoutingmodule } from './tabs-routing.module';
import { UserhomeComponent } from '../userhome/userhome.component';
import { UsersettingComponent } from '../usersetting/usersetting.component';
import { HomePage } from './home.page';
import { UseractivityService } from '../useractivity/useractivity.service';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRoutingmodule
  ],
  declarations: [UserhomeComponent, UsersettingComponent, UsertabsPage, HomePage],
  exports: [ UsertabsPage ],
  bootstrap: [],
  providers: [ UseractivityService, Camera ]
})
export class UsertabsPageModule {}
