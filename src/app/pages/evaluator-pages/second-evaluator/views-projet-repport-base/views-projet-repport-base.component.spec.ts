import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsProjetRepportBaseComponent } from './views-projet-repport-base.component';

describe('ViewsProjetRepportBaseComponent', () => {
  let component: ViewsProjetRepportBaseComponent;
  let fixture: ComponentFixture<ViewsProjetRepportBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsProjetRepportBaseComponent]
    });
    fixture = TestBed.createComponent(ViewsProjetRepportBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
