import { readonly } from "@angular/forms/signals";

export interface ValidationErrors {
    [field: string]: string[];
}

export class ApiRequestError extends Error {
    constructor(
        message: string,
        readonly status: number, 
        readonly validationErrors: ValidationErrors = {},
    ) {
        super(message);
        this.name = 'ApiRequestError'
    }
}