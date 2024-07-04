import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent } from './details-commercial-o-non-commercial-project-admin-resolved-subv.component';

describe('DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent', () => {
  let component: DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent;
  let fixture: ComponentFixture<DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent]
    });
    fixture = TestBed.createComponent(DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
