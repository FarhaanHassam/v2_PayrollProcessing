import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiRequestError, type ValidationErrors } from '../models/api-request-error';

interface ProblemDetailsResponse {
  title?: string;
  detail?: string;
  errors?: ValidationErrors;
}

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      const problem =
        typeof error.error === 'object' && error.error !== null
          ? (error.error as ProblemDetailsResponse)
          : undefined;

      const message =
        error.status === 0
          ? 'Unable to reach the payroll API. Confirm that it is running on port 5299.'
          : (problem?.detail ?? problem?.title ?? 'The request could not be completed.');

      return throwError(() => new ApiRequestError(message, error.status, problem?.errors));
    }),
);