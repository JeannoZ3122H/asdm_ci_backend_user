import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRejectDocsHelpComponent } from './completed-reject-docs-help.component';

describe('CompletedRejectDocsHelpComponent', () => {
  let component: CompletedRejectDocsHelpComponent;
  let fixture: ComponentFixture<CompletedRejectDocsHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedRejectDocsHelpComponent]
    });
    fixture = TestBed.createComponent(CompletedRejectDocsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
