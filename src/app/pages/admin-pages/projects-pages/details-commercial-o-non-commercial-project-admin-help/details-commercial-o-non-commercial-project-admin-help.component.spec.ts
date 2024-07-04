import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommercialONonCommercialProjectAdminHelpComponent } from './details-commercial-o-non-commercial-project-admin-help.component';

describe('DetailsCommercialONonCommercialProjectAdminHelpComponent', () => {
  let component: DetailsCommercialONonCommercialProjectAdminHelpComponent;
  let fixture: ComponentFixture<DetailsCommercialONonCommercialProjectAdminHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCommercialONonCommercialProjectAdminHelpComponent]
    });
    fixture = TestBed.createComponent(DetailsCommercialONonCommercialProjectAdminHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
