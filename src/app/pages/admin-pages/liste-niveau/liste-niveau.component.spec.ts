import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNiveauComponent } from './liste-niveau.component';

describe('ListeNiveauComponent', () => {
  let component: ListeNiveauComponent;
  let fixture: ComponentFixture<ListeNiveauComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeNiveauComponent]
    });
    fixture = TestBed.createComponent(ListeNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
