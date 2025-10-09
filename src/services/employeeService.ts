
import { api } from '../utils/api';
import type { Employee } from '../models';

export const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    try {
      const response = await api.get<Employee[]>('');
      return response.data;
    } catch (error: unknown) {
      console.error('Error fetching employees:', error);
      throw new Error('Không thể tải danh sách nhân viên');
    }
  },


  getEmployeeById: async (id: number): Promise<Employee> => {
    try {
      const response = await api.get<Employee>(`/${id}`);
      return response.data;
    } catch (error: unknown) {
      console.error(`Error fetching employee ${id}:`, error);
      throw new Error(`Không thể tải thông tin nhân viên với ID: ${id}`);
    }
  },

  createEmployee: async (employee: Employee): Promise<Employee> => {
    try {
      const response = await api.post<Employee>('', employee);
      return response.data;
    } catch (error: unknown) {
      console.error('Error creating employee:', error);
      throw new Error('Không thể thêm nhân viên mới');
    }
  },

  updateEmployee: async (id: number, employee: Employee): Promise<Employee> => {
    try {
      const response = await api.put<Employee>(`/${id}`, employee);
      return response.data;
    } catch (error: unknown) {
      console.error(`Error updating employee ${id}:`, error);
      throw new Error(`Không thể cập nhật nhân viên với ID: ${id}`);
    }
  },
  
  deleteEmployee: async (id: number): Promise<void> => {
    try {
      await api.delete(`/${id}`);
    } catch (error: unknown) {
      console.error(`Error deleting employee ${id}:`, error);
      throw new Error(`Không thể xóa nhân viên với ID: ${id}`);
    }
  },
};

export default employeeService;