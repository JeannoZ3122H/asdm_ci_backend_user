import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsFournirComponent } from './docs-fournir.component';

describe('DocsFournirComponent', () => {
  let component: DocsFournirComponent;
  let fixture: ComponentFixture<DocsFournirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocsFournirComponent]
    });
    fixture = TestBed.createComponent(DocsFournirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
