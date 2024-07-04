import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesCategoriesComponent } from './liste-types-categories.component';

describe('ListeTypesCategoriesComponent', () => {
  let component: ListeTypesCategoriesComponent;
  let fixture: ComponentFixture<ListeTypesCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTypesCategoriesComponent]
    });
    fixture = TestBed.createComponent(ListeTypesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
