import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstEvaluatorDetailsProjetCommercialONonCommercialComponent } from './first-evaluator-details-projet-commercial-o-non-commercial.component';

describe('FirstEvaluatorDetailsProjetCommercialONonCommercialComponent', () => {
  let component: FirstEvaluatorDetailsProjetCommercialONonCommercialComponent;
  let fixture: ComponentFixture<FirstEvaluatorDetailsProjetCommercialONonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstEvaluatorDetailsProjetCommercialONonCommercialComponent]
    });
    fixture = TestBed.createComponent(FirstEvaluatorDetailsProjetCommercialONonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
