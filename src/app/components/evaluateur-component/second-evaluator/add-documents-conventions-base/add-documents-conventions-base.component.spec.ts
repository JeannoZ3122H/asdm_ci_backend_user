import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentsConventionsBaseComponent } from './add-documents-conventions-base.component';

describe('AddDocumentsConventionsBaseComponent', () => {
  let component: AddDocumentsConventionsBaseComponent;
  let fixture: ComponentFixture<AddDocumentsConventionsBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocumentsConventionsBaseComponent]
    });
    fixture = TestBed.createComponent(AddDocumentsConventionsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
