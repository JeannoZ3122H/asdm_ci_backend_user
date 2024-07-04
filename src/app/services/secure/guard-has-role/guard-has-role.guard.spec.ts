import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardHasRoleGuard } from './guard-has-role.guard';

describe('guardHasRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardHasRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
