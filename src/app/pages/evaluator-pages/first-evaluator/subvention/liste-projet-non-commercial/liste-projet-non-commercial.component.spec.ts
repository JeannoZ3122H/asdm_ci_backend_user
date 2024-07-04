import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetNonCommercialComponent } from './liste-projet-non-commercial.component';

describe('ListeProjetNonCommercialComponent', () => {
  let component: ListeProjetNonCommercialComponent;
  let fixture: ComponentFixture<ListeProjetNonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeProjetNonCommercialComponent]
    });
    fixture = TestBed.createComponent(ListeProjetNonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
