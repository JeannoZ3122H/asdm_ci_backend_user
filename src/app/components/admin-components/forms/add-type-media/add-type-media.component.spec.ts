import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeMediaComponent } from './add-type-media.component';

describe('AddTypeMediaComponent', () => {
  let component: AddTypeMediaComponent;
  let fixture: ComponentFixture<AddTypeMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTypeMediaComponent]
    });
    fixture = TestBed.createComponent(AddTypeMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
