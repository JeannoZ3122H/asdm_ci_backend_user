import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetOrganisationComponent } from './add-budget-organisation.component';

describe('AddBudgetOrganisationComponent', () => {
  let component: AddBudgetOrganisationComponent;
  let fixture: ComponentFixture<AddBudgetOrganisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBudgetOrganisationComponent]
    });
    fixture = TestBed.createComponent(AddBudgetOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
