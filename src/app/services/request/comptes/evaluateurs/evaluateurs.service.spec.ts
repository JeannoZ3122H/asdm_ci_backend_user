import { TestBed } from '@angular/core/testing';

import { EvaluateursService } from './evaluateurs.service';

describe('EvaluateursService', () => {
  let service: EvaluateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
