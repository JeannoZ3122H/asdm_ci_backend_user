import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompteEvaluateurComponent } from './add-compte-evaluateur.component';

describe('AddCompteEvaluateurComponent', () => {
  let component: AddCompteEvaluateurComponent;
  let fixture: ComponentFixture<AddCompteEvaluateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompteEvaluateurComponent]
    });
    fixture = TestBed.createComponent(AddCompteEvaluateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
