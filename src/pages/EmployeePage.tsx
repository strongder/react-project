import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/ui/Header";
import { Search } from "../components/ui/Search";
import { Filter } from "../components/ui/Filter";
import { EmployeeList } from "../components/Employee/EmployeeList";
import type { Employee } from "../models";
import { Table } from "../components/Employee/EmployeeTable";
import { Modal } from "antd";
import { employeeService } from "../services/employeeService";
import { EmployeeDetail } from "../components/Employee/EmployeeDetail";
import AddIcon from "../assets/icon/AddIcon.svg";
import { validateEmail } from "../utils/validate";
import EmployeeStatic from "../components/Employee/EmployeeStatic";
interface EmployeeFilterState {
  position?: string;
}
const columnsData = [
  "AVATAR",
  "MÃ NV",
  "HỌ TÊN",
  "EMAIL",
  "SỐ ĐIỆN THOẠI",
  "VỊ TRÍ",
];
const positions = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "tester", label: "Tester" },
  { value: "manager", label: "Manager" },
];

export const EmployeeManagement = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [displayCard, setDisplayCard] = useState(true);
  const [displayTable, setDisplayTable] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<EmployeeFilterState>({});

  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);

  const getAllEmployee = async () => {
    setLoading(true);
    try {
      const employees = await employeeService.getAllEmployees();
      setEmployees(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  const updateEmployee = async (updatedEmployee: Employee) => {
    try {
      const updated = await employeeService.updateEmployee(
        updatedEmployee.id,
        updatedEmployee
      );
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === updatedEmployee.id ? updated : emp))
      );
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    }
  };

  const addEmployee = async (newEmployee: Employee) => {
    try {
      const created = await employeeService.createEmployee(newEmployee);
      setEmployees((prev) => [created, ...prev]);
      alert("Thêm nhân viên thành công!");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Thêm nhân viên thất bại. Vui lòng thử lại.");
    }
  };
  const delelteEmployee = async (id: number) => {
    try {
      await employeeService.deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      alert("Xóa nhân viên thành công!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Xóa nhân viên thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };
  const handleDelete = useCallback(
    (id: number) => {
      const employee = employees.find((emp) => emp.id === id);
      const employeeName = employee?.fullName;
      const confirmed = window.confirm(
        `Bạn có chắc chắn muốn xóa ${employeeName}?`
      );
      if (confirmed) {
        delelteEmployee(id);
      }
    },
    [employees]
  );
  const handleFilterChange = (selectedValue: string) => {
    setFilters({ position: selectedValue });
  };

  const handleEdit = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setIsAddMode(true);
  }, []);

  const handleView = useCallback((employee: Employee) => {
    setSelectedEmployee((prev) => (prev?.id !== employee.id ? employee : prev));
    setIsViewModalOpen(true);
  }, []);

  const toggleView = (view: string) => {
    if (view === "card") {
      setDisplayCard(true);
      setDisplayTable(false);
    } else {
      setDisplayCard(false);
      setDisplayTable(true);
    }
  };
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchTerm === "" ||
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.includes(searchTerm) ||
        employee.code.toLowerCase().includes(searchTerm);

      const matchesPosition =
        !filters.position ||
        employee.position?.toLowerCase() === filters.position;
      return matchesSearch && matchesPosition;
    });
  }, [employees, searchTerm, filters]);

  const handleAddEmployee = () => {
    setSelectedEmployee({
      id: 0,
      fullName: "",
      code: "",
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
    if (!selectedEmployee.fullName) {
      setValidName(false);
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!validateEmail(selectedEmployee.email)) {
      setValidEmail(false);
      alert("Vui lòng nhập đúng định dạng email!");
      return;
    }

    if (isEditMode) {
      updateEmployee(selectedEmployee);
    } else {
      addEmployee(selectedEmployee);
    }

    setIsAddMode(false);
    setIsEditMode(false);
    setSelectedEmployee(null);
  };

  const handleViewModalClose = useCallback(() => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  }, []);

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
      <div className="container m-auto flex flex-row gap-4 items-start">
        <div className="mt-19">
          <EmployeeStatic employees={employees} />
        </div>

        <div className="p-6 space-y-6">
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
              className="flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 !text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
              style={{ color: "white" }}
            >
              <img src={AddIcon} alt="" className="w-5 h-5 mr-2" />
              Thêm nhân viên
            </button>
          </div>
          {/* Search and Filter Section */}
          <div className="flex items-end flex-col justify-between lg:flex-row gap-4 p-6  bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-full lg:w-1/3">
              <Search
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên, email, số điện thoại, mã NV..."
              />
            </div>
            <div className="w-full lg:w-1/3">
              <Filter
                options={positions}
                onFilterChange={handleFilterChange}
                placeholder="Lọc chức vụ"
                label="Position"
                className="position"
              />
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

          {/* Card View */}
          {displayCard && (
            <EmployeeList
              employees={filteredEmployees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              loading={loading}
              searchTearm={searchTerm}
            />
          )}

          {/* Table View */}
          {displayTable && (
            <Table
              coloumnsData={columnsData}
              employees={filteredEmployees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              loading={loading}
              searchTearm={searchTerm}
            />
          )}
        </div>
      </div>

      <div>
        <EmployeeDetail
          isOpen={isViewModalOpen}
          isClose={handleViewModalClose}
          employee={selectedEmployee}
        />
      </div>

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
              {!validName && (
                <span className="text-red-500">* Nhập đủ họ tên</span>
              )}
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
              {!validEmail && (
                <span className="text-red-500">* Nhập sai định dạng email</span>
              )}
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
