import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProjetsNonCommercialsComponent } from './assigned-projets-non-commercials.component';

describe('AssignedProjetsNonCommercialsComponent', () => {
  let component: AssignedProjetsNonCommercialsComponent;
  let fixture: ComponentFixture<AssignedProjetsNonCommercialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProjetsNonCommercialsComponent]
    });
    fixture = TestBed.createComponent(AssignedProjetsNonCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
