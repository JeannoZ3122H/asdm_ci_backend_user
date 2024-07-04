import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondEvaluaorListProjetNonCommercialComponent } from './second-evaluaor-list-projet-non-commercial.component';

describe('SecondEvaluaorListProjetNonCommercialComponent', () => {
  let component: SecondEvaluaorListProjetNonCommercialComponent;
  let fixture: ComponentFixture<SecondEvaluaorListProjetNonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondEvaluaorListProjetNonCommercialComponent]
    });
    fixture = TestBed.createComponent(SecondEvaluaorListProjetNonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
