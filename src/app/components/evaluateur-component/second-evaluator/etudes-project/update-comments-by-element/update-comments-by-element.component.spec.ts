import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommentsByElementComponent } from './update-comments-by-element.component';

describe('UpdateCommentsByElementComponent', () => {
  let component: UpdateCommentsByElementComponent;
  let fixture: ComponentFixture<UpdateCommentsByElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCommentsByElementComponent]
    });
    fixture = TestBed.createComponent(UpdateCommentsByElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
