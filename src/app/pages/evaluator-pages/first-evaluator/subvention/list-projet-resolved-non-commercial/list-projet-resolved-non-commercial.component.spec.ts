import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetResolvedNonCommercialComponent } from './list-projet-resolved-non-commercial.component';

describe('ListProjetResolvedNonCommercialComponent', () => {
  let component: ListProjetResolvedNonCommercialComponent;
  let fixture: ComponentFixture<ListProjetResolvedNonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProjetResolvedNonCommercialComponent]
    });
    fixture = TestBed.createComponent(ListProjetResolvedNonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
