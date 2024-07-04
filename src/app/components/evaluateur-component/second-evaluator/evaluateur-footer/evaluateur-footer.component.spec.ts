import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateurFooterComponent } from './evaluateur-footer.component';

describe('EvaluateurFooterComponent', () => {
  let component: EvaluateurFooterComponent;
  let fixture: ComponentFixture<EvaluateurFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluateurFooterComponent]
    });
    fixture = TestBed.createComponent(EvaluateurFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
