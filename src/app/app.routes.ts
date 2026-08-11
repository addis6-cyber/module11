import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: 'dashboard',
  loadComponent: () =>
    import('./features/student-dashboard/student-dashboard.component')
      .then(m => m.StudentDashboardComponent)
},

{
  path: 'instructor',
  loadComponent: () =>
    import('./features/instructor-dashboard/instructor-dashboard')
      .then(m => m.InstructorDashboard)
},
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-detail/course-detail')
        .then(m => m.CourseDetail)
  },

  {
  path: 'enroll',
  loadComponent: () =>
    import('./features/enrollment-form/enrollment-form')
      .then(m => m.EnrollmentForm)
},
  {
  path: 'enrollments',
  loadComponent: () =>
    import('./features/enrollment-list/enrollment-list')
      .then(m => m.EnrollmentList)
},

{
  path: 'grade-submission',
  loadComponent: () =>
    import('./features/grade-submission/grade-submission.component')
      .then(m => m.GradeSubmissionComponent)
},


  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];