import { TestBed } from '@angular/core/testing';

import { CustomerCookieService } from './customer-cookie.service';

describe('CustomerCookieService', () => {
  let service: CustomerCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
