import { Component, inject, OnInit } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';
import { AnalyticsChart } from '../../ui/analytics-chart/analytics-chart';

@Component({
  selector: 'tms-instructor-dashboard',
  standalone: true,
  imports: [AnalyticsChart],
  templateUrl: './instructor-dashboard.html',
  styleUrl: './instructor-dashboard.scss'
})
export class InstructorDashboard implements OnInit {

  store = inject(EnrollmentStore);

 ngOnInit() {
  if (this.store.entities().length === 0) {
    this.store.loadEnrollments();
  }
}
}