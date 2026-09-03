import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnrollmentStore } from '../../store/enrollment.store';
import { AnalyticsChart } from '../../ui/analytics-chart/analytics-chart';
import { SignalrService } from '../../services/signalr/signalr';

@Component({
  selector: 'tms-instructor-dashboard',
  standalone: true,
  imports: [
    AnalyticsChart,
    RouterLink
  ],
  templateUrl: './instructor-dashboard.html',
  styleUrl: './instructor-dashboard.scss'
})
export class InstructorDashboard implements OnInit {

  store = inject(EnrollmentStore);

  signalr = inject(SignalrService);

  ngOnInit() {
    this.store.loadEnrollments();
    this.signalr.start();

    this.signalr.enrollmentApproved$.subscribe(event => {
      console.log(
        'Instructor dashboard received approval:',
        event
      );

      this.store.markApproved(String(event.id));
    });
  }
}