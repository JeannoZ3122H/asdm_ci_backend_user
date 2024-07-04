import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRoleComponent } from './liste-role.component';

describe('ListeRoleComponent', () => {
  let component: ListeRoleComponent;
  let fixture: ComponentFixture<ListeRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRoleComponent]
    });
    fixture = TestBed.createComponent(ListeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
