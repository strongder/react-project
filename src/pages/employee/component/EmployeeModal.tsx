import { Button, Form, Input, Modal, Select } from "antd";
import { departments, positions, status, type Employee } from "../models";
import { formatDate } from "../../../shared/utils";

interface EmployeeModalProps {
  employee?: Employee;
  isOpenView: boolean;
  isCloseView: () => void;
  isEditMode?: boolean;
  isAddMode?: boolean;
  onSaveAdd?: (employee: Employee) => void;
  onCloseAdd?: () => void;
}

export const EmployeeModal = ({
  employee,
  isOpenView,
  isCloseView,
  isEditMode = false,
  isAddMode = false,
  onSaveAdd,
  onCloseAdd,
}: EmployeeModalProps) => {
  const [form] = Form.useForm();
  const handleSave = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        title="Xem chi tiết nhân viên"
        open={isOpenView}
        onCancel={isCloseView}
        width={600}
        centered
        footer={[
          <Button key="close" onClick={isCloseView}>
            Đóng
          </Button>,
        ]}
      >
        {employee && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Họ tên</p>
                <p className="text-gray-900 py-2">{employee.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Mã nhân viên
                </p>
                <p className="text-gray-900 py-2">{employee.code}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
                <p className="text-blue-600 py-2">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </p>
                <p className="text-gray-900 py-2">{employee.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Phòng ban
                </p>
                <p className="text-gray-900 py-2">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Vị trí</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {employee.position}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    employee.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.status === "active" ? "Đang làm việc" : "Nghỉ việc"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Ngày vào làm
                </p>
                <p className="text-gray-900 py-2">
                  {formatDate(employee.joinDate)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title={isEditMode ? "Sửa thông tin nhân viên" : "Thêm nhân viên mới"}
        open={isAddMode}
        onCancel={onCloseAdd}
        width={600}
        onOk={handleSave}
        centered
        okText={isEditMode ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) =>
            onSaveAdd?.({ ...values, id: employee && employee.id })
          }
          initialValues={employee || {}}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="fullName"
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>

            <Form.Item
              name="code"
              label="Mã nhân viên"
              rules={[
                { required: true, message: "Vui lòng nhập mã nhân viên" },
              ]}
            >
              <Input placeholder="Nhập mã nhân viên" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]{9,11}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="position"
              label="Vị trí"
              rules={[{ required: true, message: "Vui lòng chọn vị trí" }]}
            >
              <Select placeholder="Chọn vị trí">
                {positions.map((pos) => (
                  <Select.Option key={pos.value} value={pos.value}>
                    {pos.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="department"
              label="Phòng ban"
              rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
            >
              <Select placeholder="Chọn phòng ban">
                {departments.map((dept) => (
                  <Select.Option key={dept.value} value={dept.value}>
                    {dept.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select placeholder="Chọn trạng thái">
                {status.map((stat) => (
                  <Select.Option key={stat.value} value={stat.value}>
                    {stat.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="joinDate"
              label="Ngày vào làm"
              rules={[
                { required: true, message: "Vui lòng chọn ngày vào làm" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeeModal;
