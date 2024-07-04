import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPerformanceAnterieureComponent } from './set-performance-anterieure.component';

describe('SetPerformanceAnterieureComponent', () => {
  let component: SetPerformanceAnterieureComponent;
  let fixture: ComponentFixture<SetPerformanceAnterieureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPerformanceAnterieureComponent]
    });
    fixture = TestBed.createComponent(SetPerformanceAnterieureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
