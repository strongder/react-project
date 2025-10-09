import { Button, Modal } from "antd";
import type { Employee } from "../../models";

interface EmployeeDetailProps {
  employee: Employee | null;
  isOpen: boolean;
  isClose: () => void;
}

export const EmployeeDetail = ({
  employee,
  isClose,
  isOpen,
}: EmployeeDetailProps) => {

  
  return (
    <Modal
      title="Xem chi tiết nhân viên"
      open={isOpen}
      onCancel={isClose}
      width={600}
      centered
      footer={[
        <Button key="close" onClick={isClose}>
          Đóng
        </Button>,
      ]}
    >
      {employee && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
              <p className="text-gray-900 py-2">{employee.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã nhân viên
              </label>
              <p className="text-gray-900 py-2">{employee.code}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-blue-600 py-2">{employee.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <p className="text-gray-900 py-2">{employee.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vị trí{" "}
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {employee.position}
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};


