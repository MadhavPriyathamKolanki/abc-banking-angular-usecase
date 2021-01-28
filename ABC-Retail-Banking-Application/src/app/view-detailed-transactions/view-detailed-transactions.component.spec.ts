import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedTransactionsComponent } from './view-detailed-transactions.component';

describe('ViewDetailedTransactionsComponent', () => {
  let component: ViewDetailedTransactionsComponent;
  let fixture: ComponentFixture<ViewDetailedTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailedTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailedTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
