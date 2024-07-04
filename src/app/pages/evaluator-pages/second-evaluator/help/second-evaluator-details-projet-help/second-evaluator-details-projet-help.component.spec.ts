import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluatorDetailsProjetHelpComponent } from './second-evaluator-details-projet-help.component';

describe('SecondEvaluatorDetailsProjetHelpComponent', () => {
  let component: SecondEvaluatorDetailsProjetHelpComponent;
  let fixture: ComponentFixture<SecondEvaluatorDetailsProjetHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluatorDetailsProjetHelpComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluatorDetailsProjetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
