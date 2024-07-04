import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCommentsHelpByElementComponent } from './set-comments-help-by-element.component';

describe('SetCommentsHelpByElementComponent', () => {
  let component: SetCommentsHelpByElementComponent;
  let fixture: ComponentFixture<SetCommentsHelpByElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCommentsHelpByElementComponent]
    });
    fixture = TestBed.createComponent(SetCommentsHelpByElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
