import { TestBed } from '@angular/core/testing';

import { SecondEvaluatorService } from './second-evaluator.service';

describe('SecondEvaluatorService', () => {
    let service: SecondEvaluatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SecondEvaluatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
