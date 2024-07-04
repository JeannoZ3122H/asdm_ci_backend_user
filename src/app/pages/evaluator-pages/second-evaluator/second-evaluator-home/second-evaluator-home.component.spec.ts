import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluatorHomeComponent } from './second-evaluator-home.component';

describe('SecondEvaluatorHomeComponent', () => {
  let component: SecondEvaluatorHomeComponent;
  let fixture: ComponentFixture<SecondEvaluatorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluatorHomeComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
