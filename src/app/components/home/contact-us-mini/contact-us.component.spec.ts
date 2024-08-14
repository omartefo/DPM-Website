import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsMiniComponent } from './contact-us.component';

describe('ContactUsMiniComponent', () => {
  let component: ContactUsMiniComponent;
  let fixture: ComponentFixture<ContactUsMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
