import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluatorDetailsProjetHelpResolvedComponent } from './second-evaluator-details-projet-help-resolved.component';

describe('SecondEvaluatorDetailsProjetHelpResolvedComponent', () => {
  let component: SecondEvaluatorDetailsProjetHelpResolvedComponent;
  let fixture: ComponentFixture<SecondEvaluatorDetailsProjetHelpResolvedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluatorDetailsProjetHelpResolvedComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluatorDetailsProjetHelpResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
