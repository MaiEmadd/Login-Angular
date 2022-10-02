import { TestBed } from '@angular/core/testing';

import { LicensesApiService } from './licenses-api.service';

describe('LicensesApiService', () => {
  let service: LicensesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicensesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
