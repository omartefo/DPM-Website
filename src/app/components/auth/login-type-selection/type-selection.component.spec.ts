import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTypeSelectionComponent } from './type-selection.component';

describe('LoginTypeSelectionComponent', () => {
  let component: LoginTypeSelectionComponent;
  let fixture: ComponentFixture<LoginTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTypeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
