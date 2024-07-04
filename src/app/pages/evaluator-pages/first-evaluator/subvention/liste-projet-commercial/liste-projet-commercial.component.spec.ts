import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetCommercialComponent } from './liste-projet-commercial.component';

describe('ListeProjetCommercialComponent', () => {
  let component: ListeProjetCommercialComponent;
  let fixture: ComponentFixture<ListeProjetCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeProjetCommercialComponent]
    });
    fixture = TestBed.createComponent(ListeProjetCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
