import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluaorListProjetResolvedCommercialComponent } from './second-evaluaor-list-projet-resolved-commercial.component';

describe('SecondEvaluaorListProjetResolvedCommercialComponent', () => {
  let component: SecondEvaluaorListProjetResolvedCommercialComponent;
  let fixture: ComponentFixture<SecondEvaluaorListProjetResolvedCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluaorListProjetResolvedCommercialComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluaorListProjetResolvedCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
