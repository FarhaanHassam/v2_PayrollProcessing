export const environment = {
    production: false, 
    apiBaseURL: 'https://staging-payroll-api2.example.com/api', 
} as const;

// A custom environment file used for pre-production testing. It mimics the production environment but points to a staging 
// database/API server so QA teams can test changes safely.

// triggerd using ng build --configuration=staging