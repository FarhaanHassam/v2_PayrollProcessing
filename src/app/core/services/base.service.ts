import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

// Class declaration for the base service
export abstract class BaseService<
    TEntity, // The type of thing being managed
    TCreateRequest = Partial<TEntity>, // Data used when creating for example, CreateEmployeeRequest
    TUpdateRequest = TCreateRequest, // Data used when updating for example, UpdateEmployeeREquest
>
{
    protected readonly http = inject(HttpClient) // HttpClient Injection. Dashboard uses EmployeeServices and EmployeeServices uses BaseServices. BaseServces uses HttpClient
    protected abstract readonly resourceUrl: string;

    // Get everything 
    // For exampple: EmployeeServices.getAll() --> GET /api/employees
    getAll(): Observable<TEntity[]> {
        return this.http.get<TEntity[]>(this.resourceUrl);
    }

    // Get by Id
    getById(id: number): Observable<TEntity> {
     return this.http.get<TEntity>(`${this.resourceUrl}/${id}`);
    }

    //  Create entity
    create(request: TCreateRequest): Observable<TEntity> {
        return this.http.post<TEntity>(this.resourceUrl, request);
    }

    update(id: number, request: TUpdateRequest): Observable<TEntity> { 
        return this.http.put<TEntity>(`${this.resourceUrl}/${id}`, request);
    }

    delete(id: number): Observable<void> { 
        return this.http.delete<void>(`${this.resourceUrl}/${id}`);
    }
}

/*
The Base service clas ia a generic service that provides common CRUD operations for any entity type

It introduces 
- Generic Types: TEntity, TCreateRequest, and TUpdateRequest to allow flexibility in defining the entity type and request payloads for creating and updating entities.
- Inheritance: The class is designed to be extended by specific services (like EmployeeService) that will provide the actual entity type and request payloads.
- Reusability: By encapsulating common CRUD operations in a base class, it promotes code reuse and reduces duplication across different services that interact with various entities in the application.
- HttpClient Injection: The HttpClient is injected into the service to facilitate making HTTP requests to the backend API.
- Communication with the API Backend: The service methods (getAll, getById, create, update, delete) use the HttpClient to communicate with the backend API endpoints defined by the resourceUrl property. This allows for seamless interaction with the backend to perform CRUD operations on the specified entity type.


The BaseService can be thought of as a reusable CRUD template
Instead of writing:

EmployeeService
PayslipService
DepartmentService
TaxService

all with: 
getAll()
getById()
create()
update()
delete()

it is all written in the BaseService. 
*/