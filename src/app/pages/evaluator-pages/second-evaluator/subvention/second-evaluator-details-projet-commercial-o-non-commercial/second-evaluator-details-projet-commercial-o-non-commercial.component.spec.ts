import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluatorDetailsProjetCommercialONonCommercialComponent } from './second-evaluator-details-projet-commercial-o-non-commercial.component';

describe('SecondEvaluatorDetailsProjetCommercialONonCommercialComponent', () => {
  let component: SecondEvaluatorDetailsProjetCommercialONonCommercialComponent;
  let fixture: ComponentFixture<SecondEvaluatorDetailsProjetCommercialONonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluatorDetailsProjetCommercialONonCommercialComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluatorDetailsProjetCommercialONonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
