import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProjetHelpEvaluateurComponent } from './assigned-projet-help-evaluateur.component';

describe('AssignedProjetHelpEvaluateurComponent', () => {
  let component: AssignedProjetHelpEvaluateurComponent;
  let fixture: ComponentFixture<AssignedProjetHelpEvaluateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProjetHelpEvaluateurComponent]
    });
    fixture = TestBed.createComponent(AssignedProjetHelpEvaluateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
