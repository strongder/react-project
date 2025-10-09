import type { Employee } from "../../models";
import DeleteIcon from "../../assets/icon/DeleteIcon.svg";
import ViewIcon from "../../assets/icon/ViewIcon.svg";
import EditIcon from "../../assets/icon/EditIcon.svg";
import EmailIcon from "../../assets/icon/EmailIcon.svg";
import PhoneIcon from "../../assets/icon/PhoneIcon.svg";
import { highlightText } from "../../utils/highlightText";
import React from "react";
interface EmployeeCardProps {
  employee: Employee;
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  highlight?: boolean;
  searchTearm?: string;
}

const EmployeeCard = ({
  employee,
  onEdit,
  onDelete,
  onView,
  highlight = false,
  searchTearm = "",
}: EmployeeCardProps) => {
  const cardClasses = highlight
    ? `bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-all duration-300 `
    : `bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300`;

  
  console.log("🔍 EmployeeCard render:", { employeeId: employee.id, highlight, searchTearm });  
  return (
    <div className={cardClasses}>
      <div className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {employee.fullName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {highlightText(employee.fullName, searchTearm)}
            </h3>
            <p className="text-sm text-gray-500 font-mono">
              Mã NV: {employee.code}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center text-gray-600">
              <img src={EmailIcon} alt="" className="h-4 w-4 mr-2" />
              <span className="text-sm truncate">
                {highlightText(employee.email, searchTearm)}
              </span>
            </div>

            <div className="flex items-center justify-center text-gray-600">
              <img src={PhoneIcon} alt="" className="h-4 w-4 mr-2" />
              <span className="text-sm font-mono">{employee.phone}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-2 flex-wrap gap-2">
            {highlight ? (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {employee.position}
              </span>
            ) : (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {employee.position}
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
          <img src={ViewIcon} alt="" className="h-5 w-5" />
        </button>

        <button
          onClick={() => onEdit?.(employee)}
          className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
          title="Chỉnh sửa"
        >
          <img src={EditIcon} alt="" className="h-5 w-5" />
        </button>

        <button
          onClick={() => onDelete?.(employee.id)}
          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Xóa"
        >
          <img src={DeleteIcon} alt="" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(EmployeeCard);