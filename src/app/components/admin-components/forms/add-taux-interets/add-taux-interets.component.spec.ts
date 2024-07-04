import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTauxInteretsComponent } from './add-taux-interets.component';

describe('AddTauxInteretsComponent', () => {
  let component: AddTauxInteretsComponent;
  let fixture: ComponentFixture<AddTauxInteretsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTauxInteretsComponent]
    });
    fixture = TestBed.createComponent(AddTauxInteretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
