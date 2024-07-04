import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsProjetRepportBaseAdminComponent } from './views-projet-repport-base-admin.component';

describe('ViewsProjetRepportBaseAdminComponent', () => {
  let component: ViewsProjetRepportBaseAdminComponent;
  let fixture: ComponentFixture<ViewsProjetRepportBaseAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsProjetRepportBaseAdminComponent]
    });
    fixture = TestBed.createComponent(ViewsProjetRepportBaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
