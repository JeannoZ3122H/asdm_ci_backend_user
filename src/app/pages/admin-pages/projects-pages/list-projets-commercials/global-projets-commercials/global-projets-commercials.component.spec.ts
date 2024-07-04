import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProjetsCommercialsComponent } from './global-projets-commercials.component';

describe('GlobalProjetsCommercialsComponent', () => {
  let component: GlobalProjetsCommercialsComponent;
  let fixture: ComponentFixture<GlobalProjetsCommercialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalProjetsCommercialsComponent]
    });
    fixture = TestBed.createComponent(GlobalProjetsCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
