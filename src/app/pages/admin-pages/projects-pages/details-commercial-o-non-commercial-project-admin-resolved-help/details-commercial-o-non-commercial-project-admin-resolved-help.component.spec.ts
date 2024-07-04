import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent } from './details-commercial-o-non-commercial-project-admin-resolved-help.component';

describe('DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent', () => {
  let component: DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent;
  let fixture: ComponentFixture<DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent]
    });
    fixture = TestBed.createComponent(DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
