import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Search } from "../components/Search";
import { Filter, type FilterState } from "../components/Filter";
import { EmployeeList } from "../components/EmployeeList";
import { type Employee } from "../components/EmployeCard";
import { Table } from "../components/Table";
import { Button, Modal } from "antd";

export const EmployeeManagement = () => {
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // Main states
  const [displayCard, setDisplayCard] = useState(true);
  const [displayTable, setDisplayTable] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({});

  const getAllEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://68db5b6123ebc87faa32b28e.mockapi.io/api/employee"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Use mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };
  const handleDelete = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    const employeeName = employee?.fullName;
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa ${employeeName}?`
    );
    if (confirmed) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      alert(`Đã xóa ${employeeName} thành công!`);
    }
  };
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setIsAddMode(true);
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const toggleView = (view: string) => {
    if (view === "card") {
      setDisplayCard(true);
      setDisplayTable(false);
    } else {
      setDisplayCard(false);
      setDisplayTable(true);
    }
  };

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      searchTerm === "" ||
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm) ||
      employee.code.toString().includes(searchTerm);

    const matchesPosition =
      !filters.position ||
      employee.position?.toLowerCase() === filters.position;
    return matchesSearch && matchesPosition;
  });

  const handleAddEmployee = () => {
    // Tạo employee rỗng cho Add mode
    setSelectedEmployee({
      id: 0, // Sẽ được gán lại trong handleFormModalOk
      fullName: "",
      code: 0,
      email: "",
      phone: "",
      position: "",
    });
    setIsEditMode(false);
    setIsAddMode(true);
  };
  const handleFormModalOk = () => {
    if (!selectedEmployee) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (
      !selectedEmployee.fullName ||
      !selectedEmployee.email ||
      !selectedEmployee.phone ||
      !selectedEmployee.position
    ) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    if (isEditMode) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        )
      );
      alert("Cập nhật thông tin thành công!");
    } else {
      const newEmployee = {
        ...selectedEmployee,
        id: Date.now(),
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      alert("Thêm nhân viên thành công!");
    }

    setIsAddMode(false);
    setIsEditMode(false);
    setSelectedEmployee(null);
  };
  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleFormModalCancel = () => {
    setIsAddMode(false);
    setSelectedEmployee(null);
    setIsEditMode(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (selectedEmployee) {
      setSelectedEmployee({ ...selectedEmployee, [name]: value });
      console.log("check", selectedEmployee);
    }
  };

  return (
    <>
      <Header content="Quản lý nhân viên" />
      <div className="container mx-auto p-6 space-y-6">
        {/* Add Employee Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Danh sách nhân viên
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý thông tin nhân viên trong hệ thống
            </p>
          </div>
          <button
            onClick={handleAddEmployee}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 !text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ color: "white" }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Thêm nhân viên
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col justify-between lg:flex-row gap-4 bg-white p-6 rounded-lg shadow-md">
          <div className="w-full lg:w-1/3">
            <Search
              onSearch={handleSearch}
              placeholder="Tìm kiếm theo tên, email, số điện thoại, mã NV..."
            />
          </div>
          <div className="w-full lg:w-1/3">
            <Filter onFilterChange={handleFilterChange} />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">
              {displayCard ? "Card View" : "Table View"}
            </span>
            <div className="relative inline-block w-11 h-5">
              <input
                checked={displayTable}
                onChange={(e) =>
                  toggleView(e.target.checked ? "table" : "card")
                }
                id="switch-component-blue"
                type="checkbox"
                className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-blue-600 cursor-pointer transition-colors duration-300"
              />
              <label
                htmlFor="switch-component-blue"
                className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-600 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>

        {/* Card View - Using EmployeeList Component */}
        {displayCard && (
          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            loading={loading}
          />
        )}

        {/* Table View */}
        {displayTable && !loading && (
          <Table
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </div>

      {/* View Modal - Chi tiết nhân viên */}
      <Modal
        title="Xem chi tiết nhân viên"
        open={isViewModalOpen}
        onCancel={handleViewModalClose}
        width={600}
        centered
        footer={[
          <Button key="close" onClick={handleViewModalClose}>
            Đóng
          </Button>,
        ]}
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ tên
                </label>
                <p className="text-gray-900 py-2">
                  {selectedEmployee.fullName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã nhân viên
                </label>
                <p className="text-gray-900 py-2">{selectedEmployee.code}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-blue-600 py-2">{selectedEmployee.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <p className="text-gray-900 py-2">{selectedEmployee.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vị trí{" "}
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedEmployee.position}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal - Thêm/Sửa nhân viên */}
      <Modal
        title={isEditMode ? "Sửa thông tin nhân viên" : "Thêm nhân viên mới"}
        open={isAddMode}
        onOk={handleFormModalOk}
        onCancel={handleFormModalCancel}
        width={600}
        centered
        okText={isEditMode ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên *
              </label>
              <input
                type="text"
                value={selectedEmployee?.fullName || ""}
                name="fullName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ tên"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã nhân viên *
              </label>
              <input
                type="text"
                value={selectedEmployee?.code || ""}
                name="code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mã nhân viên"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={selectedEmployee?.email || ""}
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại *
              </label>
              <input
                type="tel"
                value={selectedEmployee?.phone || ""}
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vị trí *
              </label>
              <select
                value={selectedEmployee?.position || ""}
                name="position"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="">Chọn vị trí</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Tester">Tester</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
