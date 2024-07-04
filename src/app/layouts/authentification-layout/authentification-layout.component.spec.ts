import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationLayoutComponent } from './authentification-layout.component';

describe('AuthentificationLayoutComponent', () => {
  let component: AuthentificationLayoutComponent;
  let fixture: ComponentFixture<AuthentificationLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthentificationLayoutComponent]
    });
    fixture = TestBed.createComponent(AuthentificationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
