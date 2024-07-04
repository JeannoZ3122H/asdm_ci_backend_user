import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNotfoundFullFolderComponent } from './message-notfound-full-folder.component';

describe('MessageNotfoundFullFolderComponent', () => {
  let component: MessageNotfoundFullFolderComponent;
  let fixture: ComponentFixture<MessageNotfoundFullFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageNotfoundFullFolderComponent]
    });
    fixture = TestBed.createComponent(MessageNotfoundFullFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
