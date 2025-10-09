import { useState } from "react";
import type { Employee } from "../../models";
import { Pagination } from "antd";
import ViewIcon from "../../assets/icon/ViewIcon.svg";
import EditIcon from "../../assets/icon/EditIcon.svg";
import DeleteIcon from "../../assets/icon/DeleteIcon.svg";
import { highlightText } from "../../utils/highlightText";

interface TableProps {
  coloumnsData: string[];
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  searchTearm?: string;
  loading?: boolean;
}

export const Table = ({
  coloumnsData,
  employees,
  onEdit,
  onDelete,
  onView,
  searchTearm = "",
  loading = false
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pagination
  const totalItems = employees.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEmployees = employees.slice(startIndex, endIndex);

  if (loading) {
    console.log("Loading state in Table component");
    return (
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 p-8`}
      >
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 `}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {coloumnsData?.map((coloumn, idx) => (
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
            {currentEmployees.map((employee) => (
              <tr
                key={employee.id}
                className={`hover:bg-gray-50 ${
                  employee.position === "Manager" ? "bg-yellow-50" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {employee.fullName.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-blue-600">
                    {employee.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {highlightText(employee.fullName, searchTearm)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {highlightText(employee.email, searchTearm)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">
                    {employee.phone}
                  </span>
                </td>

                <td className={` px-6 py-4 whitespace-nowrap`}>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {employee.position}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView?.(employee)}
                      className="text-blue-500 hover:text-blue-600 p-1 rounded cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <img src={ViewIcon} alt="" className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEdit?.(employee)}
                      className="text-green-500 hover:text-green-600 p-1 rounded cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <img src={EditIcon} alt="" className="h-5 w-5" />
                    </button>
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
                      <img src={DeleteIcon} alt="" className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <Pagination
          align="end"
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          showSizeChanger={true}
          onChange={(page, size) => {
            setCurrentPage(page);
            if (size !== pageSize) {
              setPageSize(size);
            }
          }}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} của ${total} nhân viên`
          }
          showQuickJumper={true}
          pageSizeOptions={["5", "10", "20", "50"]}
        />
      </div>
    </div>
  );
};
