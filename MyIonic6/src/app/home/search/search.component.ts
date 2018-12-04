import { Component, OnInit } from '@angular/core';
import { UseractivityService } from '../useractivity/useractivity.service';
import { JsonPipe } from '@angular/common';
import { NavController, Nav } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileviewComponent } from '../profileview/profileview.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
  }
}
