import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondListProjetHelpComponent } from './second-list-projet-help.component';

describe('SecondListProjetHelpComponent', () => {
  let component: SecondListProjetHelpComponent;
  let fixture: ComponentFixture<SecondListProjetHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondListProjetHelpComponent]
    });
    fixture = TestBed.createComponent(SecondListProjetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
