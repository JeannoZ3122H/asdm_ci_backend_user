import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstEvaluatorDetailsProjetHelpComponent } from './first-evaluator-details-projet-help.component';

describe('FirstEvaluatorDetailsProjetHelpComponent', () => {
  let component: FirstEvaluatorDetailsProjetHelpComponent;
  let fixture: ComponentFixture<FirstEvaluatorDetailsProjetHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstEvaluatorDetailsProjetHelpComponent]
    });
    fixture = TestBed.createComponent(FirstEvaluatorDetailsProjetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
