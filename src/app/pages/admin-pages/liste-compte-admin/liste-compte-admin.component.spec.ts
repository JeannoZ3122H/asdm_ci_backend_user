import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCompteAdminComponent } from './liste-compte-admin.component';

describe('ListeCompteAdminComponent', () => {
  let component: ListeCompteAdminComponent;
  let fixture: ComponentFixture<ListeCompteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCompteAdminComponent]
    });
    fixture = TestBed.createComponent(ListeCompteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
