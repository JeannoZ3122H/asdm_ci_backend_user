import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetResolvedCommercialComponent } from './list-projet-resolved-commercial.component';

describe('ListProjetResolvedCommercialComponent', () => {
  let component: ListProjetResolvedCommercialComponent;
  let fixture: ComponentFixture<ListProjetResolvedCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProjetResolvedCommercialComponent]
    });
    fixture = TestBed.createComponent(ListProjetResolvedCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
