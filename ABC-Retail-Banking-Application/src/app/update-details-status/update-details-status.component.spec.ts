import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailsStatusComponent } from './update-details-status.component';

describe('UpdateDetailsStatusComponent', () => {
  let component: UpdateDetailsStatusComponent;
  let fixture: ComponentFixture<UpdateDetailsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDetailsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
