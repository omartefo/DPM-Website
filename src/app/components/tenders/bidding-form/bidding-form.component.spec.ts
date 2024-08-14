import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingFormComponent } from './bidding-form.component';

describe('BiddingFormComponent', () => {
  let component: BiddingFormComponent;
  let fixture: ComponentFixture<BiddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
