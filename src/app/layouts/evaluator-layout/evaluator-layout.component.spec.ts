import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorLayoutComponent } from './evaluator-layout.component';

describe('EvaluatorLayoutComponent', () => {
  let component: EvaluatorLayoutComponent;
  let fixture: ComponentFixture<EvaluatorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluatorLayoutComponent]
    });
    fixture = TestBed.createComponent(EvaluatorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
