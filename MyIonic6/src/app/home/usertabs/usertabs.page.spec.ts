import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertabsPage } from './usertabs.page';

describe('UsertabsPage', () => {
  let component: UsertabsPage;
  let fixture: ComponentFixture<UsertabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
