import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMediaComponent } from './type-media.component';

describe('TypeMediaComponent', () => {
  let component: TypeMediaComponent;
  let fixture: ComponentFixture<TypeMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeMediaComponent]
    });
    fixture = TestBed.createComponent(TypeMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
