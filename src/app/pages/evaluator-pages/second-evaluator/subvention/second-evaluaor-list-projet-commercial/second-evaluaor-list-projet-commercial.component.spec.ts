import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluaorListProjetCommercialComponent } from './second-evaluaor-list-projet-commercial.component';

describe('SecondEvaluaorListProjetCommercialComponent', () => {
  let component: SecondEvaluaorListProjetCommercialComponent;
  let fixture: ComponentFixture<SecondEvaluaorListProjetCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluaorListProjetCommercialComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluaorListProjetCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
