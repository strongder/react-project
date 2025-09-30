import React from 'react';
import { EmployeeCard, type Employee } from './EmployeeCard';

interface EmployeeListProps {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  loading?: boolean;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onEdit,
  onDelete,
  onView,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={`flex justify-center items-center py-12`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className={`text-center py-12`}>
        <div className="text-gray-400 text-6xl mb-4">👥</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không tìm thấy nhân viên
        </h3>
        <p className="text-gray-500">
          Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
          highlight={employee.position?.toLowerCase() === "manager"}
        />
      ))}
    </div>
  );
};
