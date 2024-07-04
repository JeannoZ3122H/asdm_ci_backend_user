import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent } from './first-evaluator-details-projet-commercial-o-non-commercial-resolved.component';

describe('FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent', () => {
  let component: FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent;
  let fixture: ComponentFixture<FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent]
    });
    fixture = TestBed.createComponent(FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
