import { useCallback, useEffect, useState } from "react";
import { EmployeeModal } from "./component/EmployeeModal";
import type { Employee } from "./models";
import { useStores } from "../../stores";
import { initSearch, type SearchRequest } from "../../shared/models";
import { observer } from "mobx-react-lite";
import EmployeeHeader from "./component/EmployeeHeader";
import { EmployeeTable } from "./component/EmployeeTable";
interface EmployeeFilterState {
  position?: string;
  department?: string;
}
const columnsData = [
  "AVATAR",
  "MÃ NV",
  "HỌ TÊN",
  "EMAIL",
  "SỐ ĐIỆN THOẠI",
  "VỊ TRÍ",
];

export const EmployeeTablePage = observer(() => {
  const { employeeStore } = useStores();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<Employee | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<SearchRequest>(initSearch);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<EmployeeFilterState>({});

  useEffect(() => {
    employeeStore.search(searchQuery);
  }, [employeeStore]);
  const updateEmployee = async (updatedEmployee: Employee) => {
    // try {
    //   const updated = await employeeService.updateEmployee(
    //     updatedEmployee.id,
    //     updatedEmployee
    //   );
    //   setEmployees((prev) =>
    //     prev.map((emp) => (emp.id === updatedEmployee.id ? updated : emp))
    //   );
    //   alert("Cập nhật thông tin thành công!");
    // } catch (error) {
    //   console.error("Error updating employee:", error);
    //   alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    // }
  };

  const addEmployee = async (newEmployee: Employee) => {
    // try {
    //   const created = await employeeService.createEmployee(newEmployee);
    //   setEmployees((prev) => [created, ...prev]);
    //   alert("Thêm nhân viên thành công!");
    // } catch (error) {
    //   console.error("Error adding employee:", error);
    //   alert("Thêm nhân viên thất bại. Vui lòng thử lại.");
    // }
  };
  const delelteEmployee = async (id: number) => {
    // try {
    //   await employeeService.deleteEmployee(id);
    //   setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    //   alert("Xóa nhân viên thành công!");
    // } catch (error) {
    //   console.error("Error deleting employee:", error);
    //   alert("Xóa nhân viên thất bại. Vui lòng thử lại.");
    // }
  };

  const handleDelete = useCallback((id: number) => {
    //   const employee = employees.find((emp) => emp.id === id);
    //   const employeeName = employee?.fullName;
    //   const confirmed = window.confirm(
    //     `Bạn có chắc chắn muốn xóa ${employeeName}?`
    //   );
    //   if (confirmed) {
    //     delelteEmployee(id);
    //   }
  }, []);
  const handleFilterChange = (selectedValue: string) => {
    setFilters({ position: selectedValue });

  };

  const handleEdit = useCallback((employee: Employee) => {
    setEmployeeForm(employee);
    setIsEditMode(true);
    setIsAddMode(true);
  }, []);

  const handleView = useCallback((employee: Employee) => {
    setEmployeeForm((prev) => (prev?.id !== employee.id ? employee : prev));
    setIsViewModalOpen(true);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const data = { ...searchQuery, key: "fullName", value };
    employeeStore.search(data);
  };

  const handleAddEmployee = () => {
    setEmployeeForm({
      id: 0,
      fullName: "",
      code: "",
      email: "",
      phone: "",
      position: "",
      status: "active",
      department: "",
      joinDate: "",
    });
    setIsEditMode(false);
    setIsAddMode(true);
  };
  const handleFormModalOk = () => {
    if (!employeeForm) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (isEditMode) {
      updateEmployee(employeeForm);
    } else {
      addEmployee(employeeForm);
    }

    setIsAddMode(false);
    setIsEditMode(false);
    setEmployeeForm(null);
  };

  const handleViewModalClose = useCallback(() => {
    setIsViewModalOpen(false);
    setEmployeeForm(null);
  }, []);

  const handleFormModalCancel = () => {
    setIsAddMode(false);
    setEmployeeForm(null);
    setIsEditMode(false);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    // page và pageSize là giá trị mới do Pagination truyền vào
    // Gọi lại search với page và size mới
    employeeStore.search({ ...searchQuery, page, size: pageSize });
  }

  if (employeeStore.loading) {
    return (
      <div className={`flex justify-center items-center py-12`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Đang tải...</span>
      </div>
    );
  }

  console.log("Rendering EmployeeCardPage with employees:", employeeStore);

  return (
    <>
      <div className="container m-auto  gap-4 items-start">
        <div className="header py-4">
          <EmployeeHeader
            onSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onFilterChange={handleFilterChange}
            onAdd={handleAddEmployee}
          />
        </div>

        {employeeStore?.employees && (
          <EmployeeTable
            coloumnsData={columnsData}
            employees={employeeStore?.employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchTearm={searchTerm}
            pagination={employeeStore?.pagination}
            onTableChange={handlePageChange}
          />
        )}

        <EmployeeModal
          employee={employeeForm}
          isOpenView={isViewModalOpen}
          isCloseView={handleViewModalClose}
          isAddMode={isAddMode}
          isEditMode={isEditMode}
          onSaveAdd={handleFormModalOk}
          onCloseAdd={handleFormModalCancel}
        />
      </div>
      {/* <EmployeeFooter totalEmployees={employees.length} /> */}
    </>
  );
});
