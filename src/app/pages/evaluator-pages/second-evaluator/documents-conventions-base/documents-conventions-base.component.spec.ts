import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsConventionsBaseComponent } from './documents-conventions-base.component';

describe('DocumentsConventionsBaseComponent', () => {
  let component: DocumentsConventionsBaseComponent;
  let fixture: ComponentFixture<DocumentsConventionsBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsConventionsBaseComponent]
    });
    fixture = TestBed.createComponent(DocumentsConventionsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
