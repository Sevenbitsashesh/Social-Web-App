import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Input } from '@ionic/angular';

import { ViewPage } from './view.page';
import { HomePage } from '../usertabs/home.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPage],
  bootstrap: [ViewPage]
})

export class ViewPageModule implements OnInit {
  ngOnInit() {

  }
}
