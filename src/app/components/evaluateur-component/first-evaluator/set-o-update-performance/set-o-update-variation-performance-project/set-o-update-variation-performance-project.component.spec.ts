import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOUpdateVariationPerformanceProjectComponent } from './set-o-update-variation-performance-project.component';

describe('SetOUpdateVariationPerformanceProjectComponent', () => {
  let component: SetOUpdateVariationPerformanceProjectComponent;
  let fixture: ComponentFixture<SetOUpdateVariationPerformanceProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetOUpdateVariationPerformanceProjectComponent]
    });
    fixture = TestBed.createComponent(SetOUpdateVariationPerformanceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
