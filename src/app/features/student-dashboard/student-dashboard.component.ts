import { Component, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course.service';

import { CourseCardComponent } from '../../ui/course-card/course-card';
import { Course } from '../../models/course.model';

import { EnrollmentList } from '../enrollment-list/enrollment-list';
import { EnrollmentSummary } from '../enrollment-summary/enrollment-summary';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
  CourseCardComponent,
  EnrollmentList,
  EnrollmentSummary
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

  private api = inject(CourseService);

  studentName = signal('Liya Kebede');

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
}