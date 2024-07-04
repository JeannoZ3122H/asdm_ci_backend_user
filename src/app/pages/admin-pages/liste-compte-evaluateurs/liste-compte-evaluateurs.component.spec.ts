import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCompteEvaluateursComponent } from './liste-compte-evaluateurs.component';

describe('ListeCompteEvaluateursComponent', () => {
  let component: ListeCompteEvaluateursComponent;
  let fixture: ComponentFixture<ListeCompteEvaluateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCompteEvaluateursComponent]
    });
    fixture = TestBed.createComponent(ListeCompteEvaluateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
