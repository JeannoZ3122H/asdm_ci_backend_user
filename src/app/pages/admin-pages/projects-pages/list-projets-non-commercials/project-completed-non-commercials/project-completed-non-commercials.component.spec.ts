import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompletedNonCommercialsComponent } from './project-completed-non-commercials.component';

describe('ProjectCompletedNonCommercialsComponent', () => {
  let component: ProjectCompletedNonCommercialsComponent;
  let fixture: ComponentFixture<ProjectCompletedNonCommercialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCompletedNonCommercialsComponent]
    });
    fixture = TestBed.createComponent(ProjectCompletedNonCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
