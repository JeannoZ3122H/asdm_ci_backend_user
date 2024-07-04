import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCompteUtilisateurComponent } from './liste-compte-utilisateur.component';

describe('ListeCompteUtilisateurComponent', () => {
  let component: ListeCompteUtilisateurComponent;
  let fixture: ComponentFixture<ListeCompteUtilisateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCompteUtilisateurComponent]
    });
    fixture = TestBed.createComponent(ListeCompteUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
