import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsFirstProjetRepportComponent } from './previews-first-projet-repport.component';

describe('PreviewsFirstProjetRepportComponent', () => {
  let component: PreviewsFirstProjetRepportComponent;
  let fixture: ComponentFixture<PreviewsFirstProjetRepportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewsFirstProjetRepportComponent]
    });
    fixture = TestBed.createComponent(PreviewsFirstProjetRepportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
