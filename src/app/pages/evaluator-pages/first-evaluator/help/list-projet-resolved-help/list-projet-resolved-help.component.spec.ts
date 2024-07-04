import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetResolvedHelpComponent } from './list-projet-resolved-help.component';

describe('ListProjetResolvedHelpComponent', () => {
  let component: ListProjetResolvedHelpComponent;
  let fixture: ComponentFixture<ListProjetResolvedHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProjetResolvedHelpComponent]
    });
    fixture = TestBed.createComponent(ListProjetResolvedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
