import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProjetsNonCommercialsComponent } from './global-projets-non-commercials.component';

describe('GlobalProjetsNonCommercialsComponent', () => {
  let component: GlobalProjetsNonCommercialsComponent;
  let fixture: ComponentFixture<GlobalProjetsNonCommercialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalProjetsNonCommercialsComponent]
    });
    fixture = TestBed.createComponent(GlobalProjetsNonCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
