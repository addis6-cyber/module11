import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentSummary } from './enrollment-summary';

describe('EnrollmentSummary', () => {
  let component: EnrollmentSummary;
  let fixture: ComponentFixture<EnrollmentSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
