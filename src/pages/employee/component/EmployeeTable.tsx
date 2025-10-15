import { Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import type { Employee } from "../models";
import type { PaginationType } from "../../../shared/models";
import { NavLink } from "react-router-dom";

type TableProps = {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  onTableChange?: (page: number, pageSize: number) => void;
  pagination?: PaginationType;
};

export const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onView,
  onTableChange,
  pagination,
}: TableProps) => {
  const columnsData = [
    "AVATAR",
    "MÃ NV",
    "HỌ TÊN",
    "EMAIL",
    "SỐ ĐIỆN THOẠI",
    "VỊ TRÍ",
    "PHÒNG BAN",
    "STATUS",
  ];
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 `}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columnsData?.map((coloumn, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {coloumn}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className={`hover:bg-gray-50 ${
                  employee?.position === "Manager" ? "bg-yellow-50" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {employee?.fullName?.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-blue-600">
                    {employee?.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {employee?.fullName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {employee?.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">
                    {employee?.phone}
                  </span>
                </td>

                <td className={` px-6 py-4 whitespace-nowrap`}>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {employee?.position}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">
                    {employee?.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">
                    {employee?.status}
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
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa nhân viên này?"
                          )
                        ) {
                          onDelete?.(employee.id);
                        }
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

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
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
