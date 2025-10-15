import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FormOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import type { Employee } from "../models";
import { NavLink } from "react-router-dom";
interface EmployeeCardProps {
  employee: Employee;
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  highlight?: boolean;

}

const EmployeeCard = ({
  employee,
  onEdit,
  onDelete,
  onView,
  highlight = false,

}: EmployeeCardProps) => {
  const cardClasses = highlight
    ? `bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-all duration-300 `
    : `bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300`;

  console.log(`Rendering EmployeeCard for ${employee.fullName}`);
  return (
    <div className={cardClasses}>
      <div className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {employee?.fullName?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee?.fullName}
            </h3>
            <p className="text-sm text-gray-500 font-mono">
              Mã NV: {employee?.code}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2 items-center justify-center text-gray-600">
              <MailOutlined style={{ color: "blue" }} />
              <span className="text-sm truncate">
                {employee?.email}
              </span>
            </div>

            <div className="flex gap-2 items-center justify-center text-gray-600">
              <PhoneOutlined style={{ color: "red" }} />
              <span className="text-sm font-mono">{employee?.phone}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-2 flex-wrap gap-2">
            {highlight ? (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold flex items-center">
                <StarOutlined className="mr-1" />
                {employee?.position}
              </span>
            ) : (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {employee?.position}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center space-x-2">
        <button
          onClick={() => onView?.(employee)}
          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Xem chi tiết"
        >
          <EyeOutlined />
        </button>

        <button
          onClick={() => onEdit?.(employee)}
          className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
          title="Chỉnh sửa"
        >
          <EditOutlined />
        </button>
        <NavLink
          to={`/employees/edit/${employee.id}`}
          className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
          title="Chỉnh sửa"
        >
          <FormOutlined />
        </NavLink>

        <button
          onClick={() => onDelete?.(employee.id)}
          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Xóa"
        >
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
};

export default React.memo(EmployeeCard);
