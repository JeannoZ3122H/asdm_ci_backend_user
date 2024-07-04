import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocsFournirComponent } from './add-docs-fournir.component';

describe('AddDocsFournirComponent', () => {
  let component: AddDocsFournirComponent;
  let fixture: ComponentFixture<AddDocsFournirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocsFournirComponent]
    });
    fixture = TestBed.createComponent(AddDocsFournirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
