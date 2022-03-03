import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCalendarComponent } from './open-calendar.component';

describe('OpenCalendarComponent', () => {
  let component: OpenCalendarComponent;
  let fixture: ComponentFixture<OpenCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
