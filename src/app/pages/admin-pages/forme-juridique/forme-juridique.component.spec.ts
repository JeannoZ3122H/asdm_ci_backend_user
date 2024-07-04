import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeJuridiqueComponent } from './forme-juridique.component';

describe('FormeJuridiqueComponent', () => {
  let component: FormeJuridiqueComponent;
  let fixture: ComponentFixture<FormeJuridiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormeJuridiqueComponent]
    });
    fixture = TestBed.createComponent(FormeJuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
