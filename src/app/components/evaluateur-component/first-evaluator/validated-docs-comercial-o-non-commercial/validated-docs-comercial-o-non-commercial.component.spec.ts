import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedDocsComercialONonCommercialComponent } from './validated-docs-comercial-o-non-commercial.component';

describe('ValidatedDocsComercialONonCommercialComponent', () => {
  let component: ValidatedDocsComercialONonCommercialComponent;
  let fixture: ComponentFixture<ValidatedDocsComercialONonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatedDocsComercialONonCommercialComponent]
    });
    fixture = TestBed.createComponent(ValidatedDocsComercialONonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
