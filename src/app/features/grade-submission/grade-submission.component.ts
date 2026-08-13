import {
  Component,
  DestroyRef,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Subject, exhaustMap, tap } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import {
  GradePayload,
  GradeService
} from '../../services/grade.service';

@Component({
  selector: 'tms-grade-submission',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './grade-submission.component.html',
  styleUrl: './grade-submission.component.scss'
})

export class GradeSubmissionComponent {

  private api = inject(GradeService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  gradeForm = this.fb.group({
  studentId: [101, [Validators.required, Validators.min(1)]],
  courseId: [302, [Validators.required, Validators.min(1)]],
  score: [88, [
    Validators.required,
    Validators.min(0),
    Validators.max(100)
  ]]
});

isSubmitting = false;

submissionStatus = '';

private submitClick$ = new Subject<GradePayload>();

constructor() {

  this.submitClick$
    .pipe(

      exhaustMap(payload => {

        this.isSubmitting = true;

        this.submissionStatus =
          'Submitting grade to server...';

        

        return this.api.postGrade(payload).pipe(
  
);
      }),

      takeUntilDestroyed(this.destroyRef)

    )
    .subscribe({

     next: result => {

  console.log('GRADE RESULT', result);

  this.isSubmitting = false;

  this.submissionStatus =
    'Grade saved successfully! Record ID: ' + result.id;

  this.cdr.detectChanges();
},

      error: err => {

  this.isSubmitting = false;

  this.submissionStatus =
    `Submission failed: ${err.message || 'Server error'}`;

  this.cdr.detectChanges();
},
    });
    complete: () => {
  
}
}
onSubmit() {

  if (this.gradeForm.valid) {

    const rawValue = this.gradeForm.getRawValue();

    this.submitClick$.next({
      studentId: Number(rawValue.studentId),
      courseId: Number(rawValue.courseId),
      score: Number(rawValue.score)
    });
  }
}

}

