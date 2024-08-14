import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersTableComponent } from './tenders-table.component';

describe('TendersTableComponent', () => {
  let component: TendersTableComponent;
  let fixture: ComponentFixture<TendersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TendersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
