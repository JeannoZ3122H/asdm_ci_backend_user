import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCommentsByElementComponent } from './set-comments-by-element.component';

describe('SetCommentsByElementComponent', () => {
  let component: SetCommentsByElementComponent;
  let fixture: ComponentFixture<SetCommentsByElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCommentsByElementComponent]
    });
    fixture = TestBed.createComponent(SetCommentsByElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
