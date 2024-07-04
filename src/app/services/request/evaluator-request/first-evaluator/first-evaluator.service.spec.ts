import { TestBed } from '@angular/core/testing';

import { FirstEvaluatorService } from './first-evaluator.service';

describe('FirstEvaluatorService', () => {
  let service: FirstEvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstEvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
