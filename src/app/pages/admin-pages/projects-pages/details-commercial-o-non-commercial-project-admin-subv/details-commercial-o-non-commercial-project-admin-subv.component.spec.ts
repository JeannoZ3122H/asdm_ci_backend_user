import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommercialONonCommercialProjectAdminSubvComponent } from './details-commercial-o-non-commercial-project-admin-subv.component';

describe('DetailsCommercialONonCommercialProjectAdminSubvComponent', () => {
  let component: DetailsCommercialONonCommercialProjectAdminSubvComponent;
  let fixture: ComponentFixture<DetailsCommercialONonCommercialProjectAdminSubvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCommercialONonCommercialProjectAdminSubvComponent]
    });
    fixture = TestBed.createComponent(DetailsCommercialONonCommercialProjectAdminSubvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
