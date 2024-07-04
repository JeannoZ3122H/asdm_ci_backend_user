import { TestBed } from '@angular/core/testing';

import { TauxInteretsService } from './taux-interets.service';

describe('TauxInteretsService', () => {
  let service: TauxInteretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TauxInteretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
