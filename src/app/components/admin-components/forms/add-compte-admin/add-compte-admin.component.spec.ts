import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompteAdminComponent } from './add-compte-admin.component';

describe('AddCompteAdminComponent', () => {
  let component: AddCompteAdminComponent;
  let fixture: ComponentFixture<AddCompteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompteAdminComponent]
    });
    fixture = TestBed.createComponent(AddCompteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
