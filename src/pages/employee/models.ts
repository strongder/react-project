export interface Employee {
  id: number;
  fullName: string;
  code: string;
  email: string;
  position: string;
  phone: string;
  status: "active" | "inactive";
  department: string;
  joinDate: string;
}
export interface EmployeeFilterState {
  fullName?: string;
  position?: string;
  department?: string;
}

export const positions = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "tester", label: "Tester" },
  { value: "manager", label: "Manager" },
];

export const departments = [
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "Information Technology" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
];
