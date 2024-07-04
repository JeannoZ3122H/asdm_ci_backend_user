import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAccountConnectedDetectedComponent } from './old-account-connected-detected.component';

describe('OldAccountConnectedDetectedComponent', () => {
  let component: OldAccountConnectedDetectedComponent;
  let fixture: ComponentFixture<OldAccountConnectedDetectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OldAccountConnectedDetectedComponent]
    });
    fixture = TestBed.createComponent(OldAccountConnectedDetectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
