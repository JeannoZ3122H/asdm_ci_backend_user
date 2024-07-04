import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsFirstProjetRepportAdminComponent } from './previews-first-projet-repport-admin.component';

describe('PreviewsFirstProjetRepportAdminComponent', () => {
  let component: PreviewsFirstProjetRepportAdminComponent;
  let fixture: ComponentFixture<PreviewsFirstProjetRepportAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewsFirstProjetRepportAdminComponent]
    });
    fixture = TestBed.createComponent(PreviewsFirstProjetRepportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
