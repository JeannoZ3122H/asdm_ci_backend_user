import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPerformanceProjectComponent } from './set-performance-project.component';

describe('SetPerformanceProjectComponent', () => {
  let component: SetPerformanceProjectComponent;
  let fixture: ComponentFixture<SetPerformanceProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPerformanceProjectComponent]
    });
    fixture = TestBed.createComponent(SetPerformanceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
