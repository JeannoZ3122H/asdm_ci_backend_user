import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsFinalProjetRepportAdminComponent } from './previews-final-projet-repport-admin.component';

describe('PreviewsFinalProjetRepportAdminComponent', () => {
  let component: PreviewsFinalProjetRepportAdminComponent;
  let fixture: ComponentFixture<PreviewsFinalProjetRepportAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewsFinalProjetRepportAdminComponent]
    });
    fixture = TestBed.createComponent(PreviewsFinalProjetRepportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
