import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private readonly hubUrl =
  `${environment.apiBaseUrl}/hubs/enrollments`;

  private connection: HubConnection | null = null;

  connected = signal(false);

  enrollmentApproved$ = new Subject<{ id: number }>();

  async start(): Promise<void> {

  if (this.connection) {
    return;
  }

  this.connection = new HubConnectionBuilder()
    .withUrl(this.hubUrl)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  this.connection.on(
  'EnrollmentApproved',
  (data: { id: number }) => {
    console.log('Enrollment approved via SignalR:', data);

    this.enrollmentApproved$.next(data);
  }
);

  await this.connection.start();

  this.connected.set(true);

  console.log('SignalR connected');
}

}
