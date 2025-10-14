import { useCallback, useEffect, useState } from "react";
import EmployeeCard from "./component/EmployeeCard";
import { EmployeeModal } from "./component/EmployeeModal";
import type { Employee } from "./models";
import { useStores } from "../../stores";
import { initSearch, type SearchRequest } from "../../shared/models";
import { observer } from "mobx-react-lite";
import EmployeeHeader from "./component/EmployeeHeader";
import { Modal } from "antd";
interface EmployeeFilterState {
  position?: string;
  department?: string;
}

export const EmployeeCardPage = observer(() => {
  const { confirm } = Modal;
  const { employeeStore } = useStores();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
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


  const handleDelete = (id: number) => {
    confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa nhân viên này không?",
      onOk() {
        employeeStore.remove(id);
      }
    });
  };
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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const data = { ...searchQuery, key: "fullName", value };
    employeeStore.search(data);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee({
      id: uuid(),
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
    if (!selectedEmployee) {
      alert("Vui lòng điền đầy đủ thông tin!");
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

  if (employeeStore.loading) {
    return (
      <div className={`flex justify-center items-center py-12`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Đang tải...</span>
      </div>
    );
  }

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

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}
        >
          {employeeStore?.employees?.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              highlight={employee.position?.toLowerCase() === "manager"}
              searchTearm={searchTerm}
            />
          ))}
        </div>

        <EmployeeModal
          employee={selectedEmployee}
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
