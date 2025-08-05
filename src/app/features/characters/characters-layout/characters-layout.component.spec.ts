import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersLayoutComponent } from './characters-layout.component';

describe('CharactersLayoutComponent', () => {
  let component: CharactersLayoutComponent;
  let fixture: ComponentFixture<CharactersLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersLayoutComponent]
    });
    fixture = TestBed.createComponent(CharactersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
