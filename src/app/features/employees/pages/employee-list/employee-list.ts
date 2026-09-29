import { ChangeDetectionStrategy, Component, type TemplateRef, computed, inject, signal } from "@angular/core";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { NgbModal, type NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { PAYROLL_VALIDATION } from "../../../../core/constants/payroll.constants";
import { ApiRequestError } from "../../../../core/models/api-request-error";
import { NotificationService } from "../../../../core/services/notification.service";
import { Employee } from "../../models/employee.interface";
import { EmployeeService } from "../../services/employee.service";

@Component({
    selector: 'app-employee-list',
    imports: [CurrencyPipe, DatePipe, NgbPagination, RouterLink],
    templateUrl: './employee-list.html',
    styleUrl: './employee-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeList {
    private readonly employeeService = inject(EmployeeService);
    private readonly modalService = inject(NgbModal);
    private readonly notifications = inject(NotificationService);
    private deleteModalRef?: NgbModalRef;

    protected readonly employees = signal<Employee[]>([]);
    protected readonly searchQuery = signal('');
    protected readonly departmentFilter = signal('');
    protected readonly page = signal(1);
    protected readonly pageSize = PAYROLL_VALIDATION.defaultPageSize
    protected readonly isLoading = signal(true);
    protected readonly isDeleting = signal(false);
    protected readonly errorMessage = signal('')
    protected readonly employeeToDelete = signal<Employee | null>(null);

    protected readonly departments = computed(() =>
        // new set() removed the duplicates 
        // The ... before the 'new' is the spread operator which unpacks the Set into a standard array
        // Sort() sorts alphabetically
        [...new Set(this.employees().map((employee) => employee.department))].sort((left, right) =>
            left.localeCompare(right),
        ),
    );

    // Filters the employees using the searchQuery and the departmentFilter
    protected readonly filteredEmployees = computed(() => {
        const query = this.searchQuery().trim().toLocaleLowerCase();
        const department = this.departmentFilter();

        // Returns the values
        return this.employees().filter((employee) => {
            const matchesQuery = !query || employee.fullName.toLocaleLowerCase().includes(query) || employee.email.toLocaleLowerCase().includes(query);
            const matchesDepartment = !department || employee.department === department;

            return matchesQuery && matchesDepartment
        });
    });
    // Computes visible employees
    protected readonly visibleEmployees = computed(() => {
        const start = (this.page() - 1) * this.pageSize;
        return this.filteredEmployees().slice(start, start + this.pageSize)
    });
    protected readonly pageCount = computed(() =>
        Math.max(1, Math.ceil(this.filteredEmployees().length / this.pageSize)),
    );

    constructor() {
        this.loadEmployees();
    }

    protected updateSearch(event: Event): void {
        this.searchQuery.set((event.target as HTMLInputElement).value);
        this.page.set(1);
    }

    protected updateDepartment(event: Event): void {
        this.departmentFilter.set((event.target as HTMLInputElement).value);
    }

    // Initials for Employees
    protected initials(fullname: string): string {
        return fullname
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join('');
    }

    // Delete modal
    protected openDeleteModal(template: TemplateRef<unknown>, employee: Employee): void {
        this.employeeToDelete.set(employee);
        this.deleteModalRef = this.modalService.open(template, {
            centered: true,
            size: 'sm',
            ariaLabelledBy: 'delete-employee-title',
        });
    }

    // Confirm delete
    protected confirmDelete(): void {
        const employee = this.employeeToDelete()

        if (!employee || this.isDeleting()) {
            return;
        }

        this.isDeleting.set(true);
        this.employeeService.delete(employee.id).subscribe({
            next: () => {
                this.employees.update((employees) => employees.filter((item) => item.id != employee.id));
                this.notifications.success(`${employee.fullName} was removed.`);
                this.deleteModalRef?.close();
                this.employeeToDelete.set(null);

                const pageCount = Math.max(1, Math.ceil(this.filteredEmployees().length / this.pageSize));
                this.page.update((page) => Math.min(page, pageCount));
            },
            complete: () => this.isDeleting.set(false),
        });
    }

    // Load Employees
    private loadEmployees(): void {
        this.employeeService.getAll().subscribe({
            next: (employees) => this.employees.set(employees),
            error: (error: unknown) => {
                this.errorMessage.set(
                    error instanceof ApiRequestError ? error.message : 'Employee could not be loaded.',
                );
                this.isLoading.set(false);
            },
            complete: () => this.isLoading.set(false)
        })
    }
}