import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignedProjetNonCommercialEvaluateurComponent } from './asigned-projet-non-commercial-evaluateur.component';

describe('AsignedProjetNonCommercialEvaluateurComponent', () => {
  let component: AsignedProjetNonCommercialEvaluateurComponent;
  let fixture: ComponentFixture<AsignedProjetNonCommercialEvaluateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignedProjetNonCommercialEvaluateurComponent]
    });
    fixture = TestBed.createComponent(AsignedProjetNonCommercialEvaluateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
