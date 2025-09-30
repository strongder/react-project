export interface Employee {
  id: number;
  fullName: string;
  code: number;
  email: string;
  position: string;
  phone: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: number) => void;
  onView?: (employee: Employee) => void;
  highlight?: boolean;
  className?: string;
}

export const EmployeeCard = ({
  employee,
  onEdit,
  onDelete,
  onView,
  highlight = false,
  className = "",
}: EmployeeCardProps) => {
  const cardClasses = highlight 
    ? `bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-all duration-300 ${className}`
    : `bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${className}`;

  return (
    <div className={cardClasses}>
      {/* Card Body */}
      <div className="p-6">
        <div className="text-center space-y-4">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {employee.fullName.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Name and Code */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {employee.fullName}
            </h3>
            <p className="text-sm text-gray-500 font-mono">
              Mã NV: #{employee.code}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-center text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm truncate">{employee.email}</span>
            </div>

            <div className="flex items-center justify-center text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm font-mono">{employee.phone}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex justify-center space-x-2 flex-wrap gap-2">
            {highlight ? (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
          {/* Status */}
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center space-x-2">
        <button
          onClick={() => onView?.(employee)}
          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Xem chi tiết"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>

        <button
          onClick={() => onEdit?.(employee)}
          className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
          title="Chỉnh sửa"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={() => onDelete?.(employee.id)}
          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Xóa"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
