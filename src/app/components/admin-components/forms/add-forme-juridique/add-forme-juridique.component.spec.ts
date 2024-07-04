import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormeJuridiqueComponent } from './add-forme-juridique.component';

describe('AddFormeJuridiqueComponent', () => {
  let component: AddFormeJuridiqueComponent;
  let fixture: ComponentFixture<AddFormeJuridiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFormeJuridiqueComponent]
    });
    fixture = TestBed.createComponent(AddFormeJuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
