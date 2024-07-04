import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignedProjetEvaluateurComponent } from './asigned-projet-evaluateur.component';

describe('AsignedProjetEvaluateurComponent', () => {
  let component: AsignedProjetEvaluateurComponent;
  let fixture: ComponentFixture<AsignedProjetEvaluateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignedProjetEvaluateurComponent]
    });
    fixture = TestBed.createComponent(AsignedProjetEvaluateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
