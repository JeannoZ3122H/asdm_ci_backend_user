import { TestBed } from '@angular/core/testing';

import { CustomerStorageService } from './customer-storage.service';

describe('CustomerStorageService', () => {
  let service: CustomerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
