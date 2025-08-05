import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersEditComponent } from './characters-edit.component';

describe('CharactersEditComponent', () => {
  let component: CharactersEditComponent;
  let fixture: ComponentFixture<CharactersEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersEditComponent]
    });
    fixture = TestBed.createComponent(CharactersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
