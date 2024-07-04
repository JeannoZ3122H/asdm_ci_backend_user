import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRejectedDocsComercialONonCommercialComponent } from './single-rejected-docs-comercial-o-non-commercial.component';

describe('SingleRejectedDocsComercialONonCommercialComponent', () => {
  let component: SingleRejectedDocsComercialONonCommercialComponent;
  let fixture: ComponentFixture<SingleRejectedDocsComercialONonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleRejectedDocsComercialONonCommercialComponent]
    });
    fixture = TestBed.createComponent(SingleRejectedDocsComercialONonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
