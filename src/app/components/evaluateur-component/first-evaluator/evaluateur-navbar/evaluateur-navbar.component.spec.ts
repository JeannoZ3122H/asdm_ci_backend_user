import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateurNavbarComponent } from './evaluateur-navbar.component';

describe('EvaluateurNavbarComponent', () => {
  let component: EvaluateurNavbarComponent;
  let fixture: ComponentFixture<EvaluateurNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluateurNavbarComponent]
    });
    fixture = TestBed.createComponent(EvaluateurNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
