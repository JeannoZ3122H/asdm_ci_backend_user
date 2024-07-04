import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryDocsComponent } from './add-category-docs.component';

describe('AddCategoryDocsComponent', () => {
  let component: AddCategoryDocsComponent;
  let fixture: ComponentFixture<AddCategoryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryDocsComponent]
    });
    fixture = TestBed.createComponent(AddCategoryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
