import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstEvaluatorDetailsProjetHelpResolvedComponent } from './first-evaluator-details-projet-help-resolved.component';

describe('FirstEvaluatorDetailsProjetHelpResolvedComponent', () => {
  let component: FirstEvaluatorDetailsProjetHelpResolvedComponent;
  let fixture: ComponentFixture<FirstEvaluatorDetailsProjetHelpResolvedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstEvaluatorDetailsProjetHelpResolvedComponent]
    });
    fixture = TestBed.createComponent(FirstEvaluatorDetailsProjetHelpResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
