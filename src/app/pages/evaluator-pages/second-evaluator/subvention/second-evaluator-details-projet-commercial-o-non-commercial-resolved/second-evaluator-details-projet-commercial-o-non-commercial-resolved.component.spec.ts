import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent } from './second-evaluator-details-projet-commercial-o-non-commercial-resolved.component';

describe('SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent', () => {
  let component: SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent;
  let fixture: ComponentFixture<SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
