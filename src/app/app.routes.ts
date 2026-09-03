import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { roleGuard } from './guards/role.guard';
export const routes: Routes = [

  {
  path: 'login',
  loadComponent: () =>
    import('./features/login/login')
      .then(m => m.LoginComponent)
},

{
  path: 'register',
  loadComponent: () =>
    import('./features/registration/registration')
      .then(m => m.RegistrationComponent)
},

  {
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/student-dashboard/student-dashboard.component')
      .then(m => m.StudentDashboardComponent)
},

{
  path: 'instructor',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/instructor-dashboard/instructor-dashboard')
      .then(m => m.InstructorDashboard)
},
  {
    path: 'courses/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/course-detail/course-detail')
        .then(m => m.CourseDetail)
  },

  {
  path: 'enroll',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/enrollment-form/enrollment-form')
      .then(m => m.EnrollmentForm)
},
  {
  path: 'enrollments',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/enrollment-list/enrollment-list')
      .then(m => m.EnrollmentList)
},

{
  path: 'grade-submission',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/grade-submission/grade-submission.component')
      .then(m => m.GradeSubmissionComponent)
},

{
  path: 'admin/courses',
  canActivate: [roleGuard('Admin')],
  loadComponent: () =>
    import('./features/instructor-dashboard/instructor-dashboard')
      .then(m => m.InstructorDashboard)
},

{
  path: 'unauthorized',
  loadComponent: () =>
    import('./features/login/login')
      .then(m => m.LoginComponent)
},

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];