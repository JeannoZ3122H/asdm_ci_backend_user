import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRejectedDocsHelpComponent } from './single-rejected-docs-help.component';

describe('SingleRejectedDocsHelpComponent', () => {
  let component: SingleRejectedDocsHelpComponent;
  let fixture: ComponentFixture<SingleRejectedDocsHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleRejectedDocsHelpComponent]
    });
    fixture = TestBed.createComponent(SingleRejectedDocsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
