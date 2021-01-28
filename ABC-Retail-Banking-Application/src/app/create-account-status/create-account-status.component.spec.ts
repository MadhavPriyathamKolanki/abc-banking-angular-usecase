import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountStatusComponent } from './create-account-status.component';

describe('CreateAccountStatusComponent', () => {
  let component: CreateAccountStatusComponent;
  let fixture: ComponentFixture<CreateAccountStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
