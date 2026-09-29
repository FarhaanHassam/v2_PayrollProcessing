import { Injectable } from "@angular/core";
import { BaseService } from "../../../core/services/base.service";
import { environment } from "../../../../environments/environment";
import type { Employee } from "../models/employee.interface";
import type { EmployeeRequest } from "../models/employee-request.interface";

@Injectable({providedIn: 'root'}) // Create one EmployeeService for the entire application
export class EmployeeService extends BaseService<Employee, EmployeeRequest, EmployeeRequest> // Inheritance - EmployeeService automatically inherits BaseServices
{ 
    protected override readonly resourceUrl =  `${environment.apiBaseUrl}/employees`;
}

/*
employee.service.ts it is the angular employee expert. 
Whener any page needs employee data, it talks to EmployeeService instead of talking to the API directly

Examples include
- Dashboard
- Employee List
- Employee Details
- Employee Form

The heavy lifting is done by the BaseService
*/

