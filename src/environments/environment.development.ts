export const environment = { 
    production: false, 
    apiBaseUrl: '/api', // API URL is obtained form the proxy.conf.json file
} as const; 

// Used for local development. It contains settings pointing to local servers 
// (e.g., localhost) or development sandboxes.

// Triggered using ng serve or ng build --configuration=development