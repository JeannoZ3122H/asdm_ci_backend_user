import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsOldSetPerformanceComponent } from './is-old-set-performance.component';

describe('IsOldSetPerformanceComponent', () => {
  let component: IsOldSetPerformanceComponent;
  let fixture: ComponentFixture<IsOldSetPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsOldSetPerformanceComponent]
    });
    fixture = TestBed.createComponent(IsOldSetPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
