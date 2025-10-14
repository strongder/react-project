// src/services/employeeService.ts
import { api } from "@/lib/http";

export const employeeService = {
  async getAll() {
    const res = await api.get("/employees");
    return res.data;
  },

  async search(params: {
    page?: number;
    size?: number;
    key?: string;
    value?: string;
    sortBy?: string;
    sortDir?: "asc" | "desc";
  }) {
    const { page = 1, size = 10, key, value, sortBy, sortDir } = params;

    const allData = await this.getAll();

    let filtered = allData;
    if (key && value) {
      filtered = filtered.filter((item: any) => {
        const fieldValue = String(item[key] ?? "").toLowerCase();
        return fieldValue.includes(value.toLowerCase());
      });
    }

    if (sortBy) {
      filtered = filtered.slice().sort((a: any, b: any) => {
        const A = a?.[sortBy];
        const B = b?.[sortBy];
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

    return {
      data: paged,
      total,
      page,
      size
    };
  },

  async create(data: any) {
    const res = await api.post("/employees", data);
    return res.data;
  },

  async update(id: string, data: any) {
    const res = await api.put(`/employees/${id}`, data);
    return res.data;
  },

  async delete(id: string) {
    const res = await api.delete(`/employees/${id}`);
    return res.data;
  },
};
