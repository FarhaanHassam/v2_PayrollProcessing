import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';

registerLocaleData(localeEnGb);


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


  // The main.ts file Starts Angular
// Load app configuration and bootstrap the application with the App component.
// Load Root Component which includes
// the router-outlet and the main layout of the application. 
// The App component is the root component of the application and is responsible for 
// initializing the application and providing the main layout.

// Next Steps: 
// Angular loads app.config.ts which provides the configuration for the application and 
// then loads the App component which is the root component of the application. 
// The App component is responsible for initializing the application and providing the main layout.
// The App component includes the router-outlet which is where the routed components will be displayed. 
// The App component also includes the main layout of the application which includes the header, sidebar, and footer. 
// The App component also includes the main content area where the routed components will be displayed. 
// The App component also includes the main navigation which is where the user can navigate to different parts of the application.
//  The App component also includes the main footer which is where the user can find information about the 
// application and links to other parts of the application.