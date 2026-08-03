import { Component, inject } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';

@Component({
  selector: 'tms-enrollment-summary',
  standalone: true,
  templateUrl: './enrollment-summary.html',
})
export class EnrollmentSummary {

  store = inject(EnrollmentStore);
}
