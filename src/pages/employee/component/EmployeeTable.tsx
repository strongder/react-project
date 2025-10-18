import { Pagination } from "antd";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import type { Employee } from "../models";
import type { PaginationType } from "../../../shared/models";
import { NavLink } from "react-router-dom";
import { getStatusText, getStatusTextColor } from "../utils";
import { SortAscendingOutlined, SortDescendingOutlined, SwapOutlined } from "@ant-design/icons";

type TableProps = {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  onTableChange?: (page: number, pageSize: number) => void;
  pagination?: PaginationType;

  onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void;
};

export const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onView,
  onTableChange,
  pagination,
  onSortChange,
}: TableProps) => {
  const [localSortBy, setLocalSortBy] = useState<string | null>(null);
  const [localSortDir, setLocalSortDir] = useState<"asc" | "desc">("asc");
  const activeSortBy = localSortBy;
  const activeSortDir = localSortDir;

  const columnsData: { key: string; label: string; sortable?: boolean }[] = [
    { key: "avatar", label: "AVATAR", sortable: false },
    { key: "code", label: "MÃ NV", sortable: true },
    { key: "fullName", label: "HỌ TÊN", sortable: true },
    { key: "email", label: "EMAIL", sortable: false },
    { key: "phone", label: "SỐ ĐIỆN THOẠI", sortable: false },
    { key: "position", label: "VỊ TRÍ", sortable: false },
    { key: "department", label: "PHÒNG BAN", sortable: false },
    { key: "status", label: "TRẠNG THÁI", sortable: false },
  ];

  const handleHeaderClick = (key: string, canSort?: boolean) => {
    if (!canSort || !onSortChange) return;
    const isActive = activeSortBy === key;
    const nextDir: "asc" | "desc" = isActive ? (activeSortDir === "asc" ? "desc" : "asc") : "asc";
    setLocalSortBy(key);
    setLocalSortDir(nextDir);
    onSortChange(key, nextDir);
  };
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 `}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <tr>
              {columnsData?.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider select-none cursor-pointer"
                  onClick={() => handleHeaderClick(col.key, col.sortable)}
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable &&
                      (activeSortBy === col.key ? (
                        activeSortDir === "asc" ? (
                          <SortAscendingOutlined />
                        ) : (
                          <SortDescendingOutlined />
                        )
                      ) : (
                        <span className="opacity-50">
                          <SwapOutlined />
                        </span>
                      ))}
                  </span>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-black">
            {employees.map((employee) => (
              <tr 
                key={employee.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  employee?.position === "Manager" ? "bg-yellow-50 dark:bg-gray-800" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium ">
                    {employee?.fullName?.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-blue-600 dark:text-white">
                    {employee?.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {employee?.fullName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {employee?.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {employee?.phone}
                  </span>
                </td>

                <td className={` px-6 py-4 whitespace-nowrap`}>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {employee?.position}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {employee?.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-mono ${getStatusTextColor(employee?.status)}`}>
                    {getStatusText(employee?.status)}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView?.(employee)}
                      className="text-blue-500 hover:text-blue-600 p-1 rounded cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <EyeOutlined />
                    </button>
                    <button
                      onClick={() => onEdit?.(employee)}
                      className="text-green-500 hover:text-green-600 p-1 rounded cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <EditOutlined />
                    </button>

                    <NavLink
                      to={`/employees/edit/${employee.id}`}
                      className="text-green-500 hover:text-green-600 p-1 rounded cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <FormOutlined />
                    </NavLink>

                    <button
                      onClick={() => {
                        onDelete?.(employee.id);
                      }}
                      className="text-red-500 hover:text-red-600 p-1 rounded cursor-pointer"
                      title="Xóa"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 dark:bg-black dark:border-gray-700">
        <Pagination
          align="end"
          current={pagination?.page}
          total={pagination?.totalItems}
          pageSize={pagination?.size}
          showSizeChanger={true}
          onChange={onTableChange}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} của ${total} nhân viên`
          }
          pageSizeOptions={["5", "10", "20", "50"]}
        />
      </div>
    </div>
  );
};
