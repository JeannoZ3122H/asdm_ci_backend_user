import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRejectDocsComercialONonCommercialComponent } from './completed-reject-docs-comercial-o-non-commercial.component';

describe('CompletedRejectDocsComercialONonCommercialComponent', () => {
  let component: CompletedRejectDocsComercialONonCommercialComponent;
  let fixture: ComponentFixture<CompletedRejectDocsComercialONonCommercialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedRejectDocsComercialONonCommercialComponent]
    });
    fixture = TestBed.createComponent(CompletedRejectDocsComercialONonCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
