import { TestBed } from '@angular/core/testing';

import { UsertabsService } from './usertabs.service';

describe('UsertabsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsertabsService = TestBed.get(UsertabsService);
    expect(service).toBeTruthy();
  });
});
