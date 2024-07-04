import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetHelpComponent } from './list-projet-help.component';

describe('ListProjetHelpComponent', () => {
  let component: ListProjetHelpComponent;
  let fixture: ComponentFixture<ListProjetHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProjetHelpComponent]
    });
    fixture = TestBed.createComponent(ListProjetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
