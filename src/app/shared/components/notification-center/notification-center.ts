import { Component, inject } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap/alert';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification-center',
  imports: [NgbAlert],
  templateUrl: './notification-center.html',
  styleUrl: './notification-center.scss',
})
export class NotificationCenter {
  protected readonly notificationService = inject(NotificationService);
}
