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
  status?: string | "active" | "inactive";
}

export const positions = [
  { value: "Developer", label: "Developer" },
  { value: "Designer", label: "Designer" },
  { value: "Tester", label: "Tester" },
  { value: "Manager", label: "Manager" },
];

export const departments = [
  { value: "HR", label: "Human Resources" },
  { value: "IT", label: "Information Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Marketing", label: "Marketing" },
];

export const status = [
  { value: "active", label: "Đang làm việc" },
  { value: "inactive", label: "Nghỉ việc" },
];
