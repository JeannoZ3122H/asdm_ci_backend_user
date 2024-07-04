import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondListProjetResolvedHelpComponent } from './second-list-projet-resolved-help.component';

describe('SecondListProjetResolvedHelpComponent', () => {
  let component: SecondListProjetResolvedHelpComponent;
  let fixture: ComponentFixture<SecondListProjetResolvedHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondListProjetResolvedHelpComponent]
    });
    fixture = TestBed.createComponent(SecondListProjetResolvedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
