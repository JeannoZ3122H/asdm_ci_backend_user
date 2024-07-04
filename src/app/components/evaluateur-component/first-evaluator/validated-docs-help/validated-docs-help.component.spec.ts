import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedDocsHelpComponent } from './validated-docs-help.component';

describe('ValidatedDocsHelpComponent', () => {
  let component: ValidatedDocsHelpComponent;
  let fixture: ComponentFixture<ValidatedDocsHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatedDocsHelpComponent]
    });
    fixture = TestBed.createComponent(ValidatedDocsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
