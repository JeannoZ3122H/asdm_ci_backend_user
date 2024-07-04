import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailGetForChangePasswordComponent } from './mail-get-for-change-password.component';

describe('MailGetForChangePasswordComponent', () => {
  let component: MailGetForChangePasswordComponent;
  let fixture: ComponentFixture<MailGetForChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailGetForChangePasswordComponent]
    });
    fixture = TestBed.createComponent(MailGetForChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
