import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsFinalProjetRepportComponent } from './previews-final-projet-repport.component';

describe('PreviewsFinalProjetRepportComponent', () => {
  let component: PreviewsFinalProjetRepportComponent;
  let fixture: ComponentFixture<PreviewsFinalProjetRepportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewsFinalProjetRepportComponent]
    });
    fixture = TestBed.createComponent(PreviewsFinalProjetRepportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
