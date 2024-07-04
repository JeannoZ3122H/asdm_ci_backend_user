import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDocsComponent } from './category-docs.component';

describe('CategoryDocsComponent', () => {
  let component: CategoryDocsComponent;
  let fixture: ComponentFixture<CategoryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDocsComponent]
    });
    fixture = TestBed.createComponent(CategoryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
