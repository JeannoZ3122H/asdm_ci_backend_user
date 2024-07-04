import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompletedCommercialsComponent } from './project-completed-commercials.component';

describe('ProjectCompletedCommercialsComponent', () => {
  let component: ProjectCompletedCommercialsComponent;
  let fixture: ComponentFixture<ProjectCompletedCommercialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCompletedCommercialsComponent]
    });
    fixture = TestBed.createComponent(ProjectCompletedCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
