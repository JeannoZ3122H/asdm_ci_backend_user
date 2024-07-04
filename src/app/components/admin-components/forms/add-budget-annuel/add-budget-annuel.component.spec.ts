import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetAnnuelComponent } from './add-budget-annuel.component';

describe('AddBudgetAnnuelComponent', () => {
  let component: AddBudgetAnnuelComponent;
  let fixture: ComponentFixture<AddBudgetAnnuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBudgetAnnuelComponent]
    });
    fixture = TestBed.createComponent(AddBudgetAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
