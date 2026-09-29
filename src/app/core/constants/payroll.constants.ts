// These constants are to keep fixed data 

export interface PayrollMonth {
    value: number;
    label: string;
    shortLabel: string;
}

export const PAYROLL_MONTHS: readonly PayrollMonth[] = [
    { value: 1, label: 'January', shortLabel: 'Jan' },
    { value: 2, label: 'February', shortLabel: 'Feb' },
    { value: 3, label: 'March', shortLabel: 'Mar' },
    { value: 4, label: 'April', shortLabel: 'Apr' },
    { value: 5, label: 'May', shortLabel: 'May' },
    { value: 6, label: 'June', shortLabel: 'Jun' },
    { value: 7, label: 'July', shortLabel: 'Jul' },
    { value: 8, label: 'August', shortLabel: 'Aug' },
    { value: 9, label: 'September', shortLabel: 'Sep' },
    { value: 10, label: 'October', shortLabel: 'Oct' },
    { value: 11, label: 'November', shortLabel: 'Nov' },
    { value: 12, label: 'December', shortLabel: 'Dec' },
]


export interface Department {
    value: number;
    label: string;
    shortLabel: string;
}
export const DEPARTMENT: readonly Department[] = [
    { value: 1, label: 'Human Resources', shortLabel: 'HR' },
    { value: 2, label: 'Finance and Accounting', shortLabel: 'FIN' },
    { value: 3, label: 'Marketing', shortLabel: 'MKT' },
    { value: 4, label: 'Sales', shortLabel: 'SAL' },
    { value: 5, label: 'Operations', shortLabel: 'OPS' },
    { value: 6, label: 'Information Technology', shortLabel: 'IT' },
    { value: 7, label: 'Customer Service', shortLabel: 'CS' },
    { value: 8, label: 'Legal', shortLabel: 'LEG' },
]



export const PAYROLL_VALIDATION = {
    fullNameMinLength: 2,
    fullNameMaxLength: 200,
    emailMaxLength: 254,
    // departmentMinLength: 2, 
    // departmentMaxLength: 80, 
    minimumSalary: 15000,
    minimumPensionPercent: 3,
    maximumPensionPercent: 10,
    minimumYear: 2000,
    // Using a function to keeop the object configuration. 
    get maximumYear(): number {
        return new Date().getFullYear();
    },
    defaultPageSize: 8,
}

