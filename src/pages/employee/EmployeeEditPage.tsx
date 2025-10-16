import { Button, Card, Form, Input, message, Select } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../../stores";
import { observer } from "mobx-react-lite";
import type { Employee } from "./models";

export const EmployeeEditPage = observer(() => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { employeeStore } = useStores();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      employeeStore.getById(Number(id));
    }
  }, [id, employeeStore]);

  useEffect(() => {
    if (employeeStore.employeeById) {
      form.setFieldsValue(employeeStore.employeeById);
    }
  }, [employeeStore.employeeById, form]);

  const handleSaveEmployee = (employeeForm: Employee) => {
    employeeStore.update(Number(id), employeeForm);
    employeeStore.search({ page: 1, size: 10 });
    message.success("Cập nhật thông tin nhân viên thành công");
    navigate(-1)
  };

  return (
    <div className="container mx-auto p-4">
      <Card title="Chỉnh sửa thông tin nhân viên">
        <Form
          form={form}
          layout="vertical"
          initialValues={employeeStore.employeeById || {}}
          onFinish={handleSaveEmployee}
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
                <Select.Option value="Developer">Developer</Select.Option>
                <Select.Option value="Designer">Designer</Select.Option>
                <Select.Option value="Manager">Manager</Select.Option>
                <Select.Option value="Tester">Tester</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="department"
              label="Phòng ban"
              rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
            >
              <Select placeholder="Chọn phòng ban">
                <Select.Option value="hr">HR</Select.Option>
                <Select.Option value="it">IT</Select.Option>
                <Select.Option value="finance">Finance</Select.Option>
                <Select.Option value="marketing">Marketing</Select.Option>
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
                <Select.Option value="active">Đang làm việc</Select.Option>
                <Select.Option value="inactive">Nghỉ việc</Select.Option>
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
          <div className="flex flex-end justify-end gap-5">
            <Button type="default" onClick={() => navigate(-1)}>
            
              Thoát
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
});
