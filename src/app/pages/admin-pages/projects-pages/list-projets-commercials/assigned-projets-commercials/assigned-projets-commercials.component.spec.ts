import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProjetsCommercialsComponent } from './assigned-projets-commercials.component';

describe('AssignedProjetsCommercialsComponent', () => {
  let component: AssignedProjetsCommercialsComponent;
  let fixture: ComponentFixture<AssignedProjetsCommercialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProjetsCommercialsComponent]
    });
    fixture = TestBed.createComponent(AssignedProjetsCommercialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
