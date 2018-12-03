import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavController } from '@ionic/angular';

import { UsertabsPage } from './usertabs.page';
import { TabRoutingmodule } from './tabs-routing.module';
import { UserhomeComponent } from '../userhome/userhome.component';
import { UsersettingComponent } from '../usersetting/usersetting.component';
import { HomePage } from './home.page';
import { UseractivityService } from '../useractivity/useractivity.service';
import { Camera } from '@ionic-native/camera/ngx';
import { CreateComponent } from '../create/create.component';
import { SearchComponent } from '../search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRoutingmodule,
    ReactiveFormsModule
  ],
  declarations: [UserhomeComponent, UsersettingComponent, UsertabsPage, HomePage, CreateComponent, SearchComponent],
  exports: [ UsertabsPage ],
  bootstrap: [],
  providers: [ UseractivityService, Camera ]
})
export class UsertabsPageModule {}
