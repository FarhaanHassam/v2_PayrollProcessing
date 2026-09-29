import { Injectable, signal } from "@angular/core";

export type NotificationType = 'success' | 'danger' | 'info'; 

export interface AppNotification { 
    id: Number; 
    type: NotificationType; 
    message: string;

}

@Injectable({providedIn: 'root'})
export class NotificationService {
    readonly notifications = signal<AppNotification[]>([]);
    private nextId = 1; 

    success(message: string): void {
        this.push('success', message);
    }

    error(message: string): void{
        this.push('danger', message);
    }
    
    info(message: string): void {
        this.push('info', message);
    }
    
    dismiss(id: number): void{
        this.notifications.update((items) => items.filter((item) => item.id !== id))
    }

    private push(type: NotificationType, message: string): void {
        const notification = { id: this.nextId++, type, message};
        this.notifications.update((items) => [...items, notification])

        window.setTimeout(() => this.dismiss(notification.id), 4500);
    }


}

