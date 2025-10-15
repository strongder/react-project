import { makeObservable, observable, action, runInAction } from "mobx";
import type { Employee } from "../pages/employee/models";
import type { SearchRequest, SearchResponse } from "../shared/models";
import { employeeService } from "../services/employee.service";

export class EmployeeStore {
  employees: Employee[] = [];
  employeeById: Employee | null = null;
  loading = false;
  error: string | null = null;
  pagination = {
    page: 1,
    size: 10,
    totalItems: 0,
    totalPages: 0,
  };

  constructor() {
    makeObservable(this, {
      employees: observable,
      employeeById: observable,
      loading: observable,
      error: observable,
      pagination: observable,
      search: action,
      create: action,
      update: action,
      remove: action,
    });
  }

  async search(params: SearchRequest) {
    console.log("EmployeeStore: Starting search with params", params);
    this.loading = true;
    this.error = null;

    try {
      const res: SearchResponse<Employee> = await employeeService.search(
        params
      );
      console.log("EmployeeStore: Search successful, response:", res);
      runInAction(() => {
        this.employees = res.data;
        this.pagination = {
          page: res.pagignation.page,
          size: res.pagignation.size,
          totalItems: res.pagignation.totalItems,
          totalPages: res.pagignation.totalPages,
        };
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : String(e);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async create(data: Employee) {
    this.loading = true;
    try {
      const newItem = await employeeService.create(data);
      runInAction(() => {
        this.employees.push(newItem);
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : String(e);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async update(id: number, data: Employee) {
    this.loading = true;
    try {
      const updated = await employeeService.update(id, data);
      runInAction(() => {
        const idx = this.employees.findIndex((e) => e.id === id);
        if (idx > -1) this.employees[idx] = updated;
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : String(e);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async remove(id: number) {
    this.loading = true;
    try {
      await employeeService.delete(id);
      runInAction(() => {
        this.employees = this.employees.filter((e) => e.id !== id);
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : String(e);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  async getById(id: number){
    this.loading = true;
    this.error = null;
    try {
      const employee = await employeeService.getById(id);
      console.log("EmployeeStore: Fetched employee:", employee);
      runInAction(() => {
        this.employeeById = employee;
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : String(e);
      });
      return null;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
