import { TestBed } from '@angular/core/testing';

import { BudgetAnnuelService } from './budget-annuel.service';

describe('BudgetAnnuelService', () => {
  let service: BudgetAnnuelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetAnnuelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
