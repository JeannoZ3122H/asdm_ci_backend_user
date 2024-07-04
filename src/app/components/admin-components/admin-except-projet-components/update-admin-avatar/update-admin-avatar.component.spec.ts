import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminAvatarComponent } from './update-admin-avatar.component';

describe('UpdateAdminAvatarComponent', () => {
  let component: UpdateAdminAvatarComponent;
  let fixture: ComponentFixture<UpdateAdminAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdminAvatarComponent]
    });
    fixture = TestBed.createComponent(UpdateAdminAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
