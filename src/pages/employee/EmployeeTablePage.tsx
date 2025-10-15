import { useCallback, useEffect, useState } from "react";
import { EmployeeModal } from "./component/EmployeeModal";
import type { Employee, EmployeeFilterState } from "./models";
import { useStores } from "../../stores";
import { initSearch, type SearchRequest } from "../../shared/models";
import { observer } from "mobx-react-lite";
import EmployeeHeader from "./component/EmployeeHeader";
import { EmployeeTable } from "./component/EmployeeTable";
import { Modal } from "antd";

const columnsData = [
  "AVATAR",
  "MÃ NV",
  "HỌ TÊN",
  "EMAIL",
  "SỐ ĐIỆN THOẠI",
  "VỊ TRÍ",
];

export const EmployeeTablePage = observer(() => {
  const { confirm } = Modal;
  const { employeeStore } = useStores();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<Employee>();
  const [searchQuery, setSearchQuery] = useState<SearchRequest>(initSearch);
  const [filters, setFilters] = useState<EmployeeFilterState>({});

  useEffect(() => {
    employeeStore.search(searchQuery);
  }, [employeeStore, searchQuery]);
  const updateEmployee = (updatedEmployee: Employee) => {
    console.log("updateEmployee called with:", updatedEmployee);
    employeeStore.update(updatedEmployee.id, updatedEmployee);
  };

  const addEmployee = async (newEmployee: Employee) => {
    employeeStore.create(newEmployee);
  };
  const resetForm = () => {
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
  };

  const handleDelete = useCallback(
    (id: number) => {
      confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa nhân viên này không?",
        onOk() {
          employeeStore.remove(id);
        },
      });
    },
    [confirm, employeeStore]
  );
  const handleFilterChange = (changed: EmployeeFilterState) => {
    const newFilters = { ...filters, ...changed };
    setFilters(newFilters);
    setSearchQuery((prev) => ({ ...prev, filters: newFilters }));
  };

  const handleEdit = useCallback((employee: Employee) => {
    console.log("handleEdit called with employee:", employee);
    setEmployeeForm(employee);
    setIsEditMode(true);
    setIsAddMode(true);
  }, []);

  const handleView = useCallback((employee: Employee) => {
    setEmployeeForm((prev) => (prev?.id !== employee.id ? employee : prev));
    setIsViewModalOpen(true);
  }, []);

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, fullName: value };
    setFilters(newFilters);
    setSearchQuery((prev) => ({ ...prev, filters: newFilters }));
    employeeStore.search({ ...searchQuery, filters: newFilters });
  };

  const handleAddEmployee = () => {
    resetForm();
    setIsEditMode(false);
    setIsAddMode(true);
  };
  const handleFormModalOk = (employee: Employee) => {
    
    if (isEditMode) {
    console.log("handleFormModalOk called");

      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setIsAddMode(false);
    setIsEditMode(false);
    resetForm();
  };

  const handleViewModalClose = useCallback(() => {
    setIsViewModalOpen(false);
    resetForm();
  }, []);

  const handleFormModalCancel = () => {
    setIsAddMode(false);
    resetForm();
    setIsEditMode(false);
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    const newSearch = { ...searchQuery, page, size: pageSize };
    setSearchQuery(newSearch);
  };
  return (
    <>
      <div className="container m-auto  gap-4 items-start">
        <div className="header py-4">
          <EmployeeHeader
            onSearch={handleSearch}
            filters={filters}
            onFilterChange={handleFilterChange}
            onAdd={handleAddEmployee}
          />
        </div>
        {employeeStore?.loading && (
          <div className={`flex justify-center items-center py-12`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Đang tải...</span>
          </div>
        )}
        {!employeeStore.loading && employeeStore?.employees && (
          <EmployeeTable
            coloumnsData={columnsData}
            employees={employeeStore?.employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            pagination={employeeStore?.pagination}
            onTableChange={handlePageChange}
          />
        )}

        <EmployeeModal
          employee={employeeForm}
          isOpenView={isViewModalOpen}
          isCloseView={handleViewModalClose}
          isEditMode={isEditMode}
          isAddMode={isAddMode}
          onSaveAdd={handleFormModalOk}
          onCloseAdd={handleFormModalCancel}
        />
      </div>
    </>
  );
});
