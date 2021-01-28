import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountSummaryComponent } from './view-account-summary.component';

describe('ViewAccountSummaryComponent', () => {
  let component: ViewAccountSummaryComponent;
  let fixture: ComponentFixture<ViewAccountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAccountSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
