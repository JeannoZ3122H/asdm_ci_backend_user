import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompteUtilisateurComponent } from './add-compte-utilisateur.component';

describe('AddCompteUtilisateurComponent', () => {
  let component: AddCompteUtilisateurComponent;
  let fixture: ComponentFixture<AddCompteUtilisateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompteUtilisateurComponent]
    });
    fixture = TestBed.createComponent(AddCompteUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
