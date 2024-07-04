import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommentsHelpByElementComponent } from './update-comments-help-by-element.component';

describe('UpdateCommentsHelpByElementComponent', () => {
  let component: UpdateCommentsHelpByElementComponent;
  let fixture: ComponentFixture<UpdateCommentsHelpByElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCommentsHelpByElementComponent]
    });
    fixture = TestBed.createComponent(UpdateCommentsHelpByElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
