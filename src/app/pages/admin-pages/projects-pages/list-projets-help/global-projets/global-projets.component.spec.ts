import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProjetsComponent } from './global-projets.component';

describe('GlobalProjetsComponent', () => {
  let component: GlobalProjetsComponent;
  let fixture: ComponentFixture<GlobalProjetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalProjetsComponent]
    });
    fixture = TestBed.createComponent(GlobalProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
