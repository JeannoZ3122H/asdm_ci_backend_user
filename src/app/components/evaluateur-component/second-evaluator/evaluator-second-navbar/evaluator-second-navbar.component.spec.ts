import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorSecondNavbarComponent } from './evaluator-second-navbar.component';

describe('EvaluatorSecondNavbarComponent', () => {
  let component: EvaluatorSecondNavbarComponent;
  let fixture: ComponentFixture<EvaluatorSecondNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluatorSecondNavbarComponent]
    });
    fixture = TestBed.createComponent(EvaluatorSecondNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
