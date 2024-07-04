import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluaorListProjetResolvedNonCommercialComponent } from './second-evaluaor-list-projet-resolved-non-commercial.component';

describe('SecondEvaluaorListProjetResolvedNonCommercialComponent', () => {
  let component: SecondEvaluaorListProjetResolvedNonCommercialComponent;
  let fixture: ComponentFixture<SecondEvaluaorListProjetResolvedNonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluaorListProjetResolvedNonCommercialComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluaorListProjetResolvedNonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
