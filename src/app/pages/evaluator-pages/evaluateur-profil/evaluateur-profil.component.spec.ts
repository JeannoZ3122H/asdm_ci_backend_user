import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateurProfilComponent } from './evaluateur-profil.component';

describe('EvaluateurProfilComponent', () => {
  let component: EvaluateurProfilComponent;
  let fixture: ComponentFixture<EvaluateurProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluateurProfilComponent]
    });
    fixture = TestBed.createComponent(EvaluateurProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
