import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentsConventionsBaseComponent } from './list-documents-conventions-base.component';

describe('ListDocumentsConventionsBaseComponent', () => {
  let component: ListDocumentsConventionsBaseComponent;
  let fixture: ComponentFixture<ListDocumentsConventionsBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDocumentsConventionsBaseComponent]
    });
    fixture = TestBed.createComponent(ListDocumentsConventionsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
