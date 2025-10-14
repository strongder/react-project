import type { Employee } from "../pages/employee/models";
import type { SearchRequest, SearchResponse } from "../shared/models";

import { api } from "./api";


export const employeeService = {
  async getAll() {
    const res = await api.get("/employees");
    return res.data;
  },

  async search(data: SearchRequest): Promise<SearchResponse<Employee>> {
    const { page = 1, size = 10, filters = {}, sortBy, sortDir } = data;

    const allData = await this.getAll();

    
    let filtered = allData.filter((item: Employee) => {
      return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const fieldValue = String(item[key as keyof Employee] ?? "").toLowerCase();
      return fieldValue.includes(String(value).toLowerCase());
    });
    });
    if (sortBy) {
      filtered = filtered.slice().sort((a: Employee, b: Employee) => {
        const A = a[sortBy as keyof Employee];
        const B = b[sortBy as keyof Employee];
        if (A == null && B == null) return 0;
        if (A == null) return sortDir === "desc" ? 1 : -1;
        if (B == null) return sortDir === "desc" ? -1 : 1;
        if (A < B) return sortDir === "desc" ? 1 : -1;
        if (A > B) return sortDir === "desc" ? -1 : 1;
        return 0;
      });
    }

    const total = filtered.length;
    const start = (page - 1) * size;
    const paged = filtered.slice(start, start + size);

    const result: SearchResponse<Employee> = {
      data: paged,
      pagignation: {
        page,
        size,
        totalItems: total,
        totalPages: Math.ceil(total / size),
      },
    };

    return result;
  },

  async create(data: Employee) 
  { 
    const res = await api.post("/employees", data);
    return res.data;
  },

  async update(id: number, data: Employee) {
    const res = await api.put(`/employees/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`/employees/${id}`);
    return res.data;
  },
};


