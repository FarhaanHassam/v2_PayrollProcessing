import { ApplicationConfig, provideBrowserGlobalErrorListeners,     } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiErrorInterceptor } from './core/interceptors/api-error.interceptor';
import { PayrollTitleStrategy } from './core/services/payroll-title.strategy';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiErrorInterceptor])),
    {provide: TitleStrategy, 
      useClass: PayrollTitleStrategy
    },
  ]
};

// The app.config.ts file is responsible for proving the configuration for the application 
// It provides the router configuration and the HTTP client configurations.

// The app.config.ts file is imported in the main.ts file and is use to bootstrap
// the application with the App Component

// The aplication settings for the Angular Applicatio

