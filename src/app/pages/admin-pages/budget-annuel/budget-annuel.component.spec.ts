import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAnnuelComponent } from './budget-annuel.component';

describe('BudgetAnnuelComponent', () => {
  let component: BudgetAnnuelComponent;
  let fixture: ComponentFixture<BudgetAnnuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetAnnuelComponent]
    });
    fixture = TestBed.createComponent(BudgetAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
