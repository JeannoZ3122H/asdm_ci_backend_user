import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProjetsComponent } from './assigned-projets.component';

describe('AssignedProjetsComponent', () => {
  let component: AssignedProjetsComponent;
  let fixture: ComponentFixture<AssignedProjetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProjetsComponent]
    });
    fixture = TestBed.createComponent(AssignedProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
