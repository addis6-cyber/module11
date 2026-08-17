import { Component, viewChild, effect, inject } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SignalrService } from '../../services/signalr/signalr';

import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentSummary } from '../enrollment-summary/enrollment-summary';
@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  imports: [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  EnrollmentSummary
],
  templateUrl: './enrollment-list.html',
  styleUrl: './enrollment-list.scss'
})
export class EnrollmentList {

  store = inject(EnrollmentStore);
  signalr = inject(SignalrService);
  displayedColumns = [
    'studentName',
    'courseName',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Enrollment>();

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  constructor() {

    effect(() => {
      this.dataSource.data = this.store.entities();
    });

    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });

    this.store.loadEnrollments();
    this.signalr.start();
    this.signalr.enrollmentApproved$.subscribe(event => {
  console.log('Enrollment approval received:', event);

  this.store.markApproved(String(event.id));
});
  }
}