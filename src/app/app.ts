import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationCenter } from './shared/components/notification-center/notification-center';

@Component({
  imports: [NotificationCenter, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Payroll Processing System');
  protected readonly currentYear = new Date().getFullYear();
}
