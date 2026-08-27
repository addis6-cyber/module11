import { Component, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course.service';

import { CourseCardComponent } from '../../ui/course-card/course-card';
import { Course } from '../../models/course.model';

import { EnrollmentList } from '../enrollment-list/enrollment-list';
import { EnrollmentSummary } from '../enrollment-summary/enrollment-summary';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
 imports: [
  RouterLink,
  CourseCardComponent,
  EnrollmentList,
  EnrollmentSummary
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

  private api = inject(CourseService);
  private auth = inject(AuthService);
  private router = inject(Router);

  studentName = signal('Addisu Sheko');

  earnedCredits = signal(45);

  graduationStatus = computed(() =>
    this.earnedCredits() >= 120
      ? 'Eligible for Graduation'
      : 'In Progress'
  );

  registerForClass() {
    this.earnedCredits.update(c => c + 3);
  }

  selectedCourse = signal<Course | null>(null);

  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }

 

logout() {
  this.auth.logout().subscribe({
    next: () => {
      this.auth.clearUser();
      this.router.navigate(['/login']);
    },
    error: () => {
      this.auth.clearUser();
      this.router.navigate(['/login']);
    }
  });
}
}