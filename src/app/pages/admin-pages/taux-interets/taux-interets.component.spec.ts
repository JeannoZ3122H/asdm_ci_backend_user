import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxInteretsComponent } from './taux-interets.component';

describe('TauxInteretsComponent', () => {
  let component: TauxInteretsComponent;
  let fixture: ComponentFixture<TauxInteretsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TauxInteretsComponent]
    });
    fixture = TestBed.createComponent(TauxInteretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
