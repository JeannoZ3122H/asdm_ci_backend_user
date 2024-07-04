import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOUpdateVariationPerformanceAnterieureComponent } from './set-o-update-variation-performance-anterieure.component';

describe('SetOUpdateVariationPerformanceAnterieureComponent', () => {
  let component: SetOUpdateVariationPerformanceAnterieureComponent;
  let fixture: ComponentFixture<SetOUpdateVariationPerformanceAnterieureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetOUpdateVariationPerformanceAnterieureComponent]
    });
    fixture = TestBed.createComponent(SetOUpdateVariationPerformanceAnterieureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
