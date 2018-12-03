import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchviewPage } from './searchview.page';

describe('SearchviewPage', () => {
  let component: SearchviewPage;
  let fixture: ComponentFixture<SearchviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
