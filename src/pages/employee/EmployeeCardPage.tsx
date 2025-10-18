import { useCallback, useEffect, useState } from "react";
import EmployeeCard from "./component/EmployeeCard";
import { EmployeeModal } from "./component/EmployeeModal";
import type { Employee, EmployeeFilterState } from "./models";
import { useStores } from "../../stores";
import { initSearch, type SearchRequest } from "../../shared/models";
import { observer } from "mobx-react-lite";
import EmployeeHeader from "./component/EmployeeHeader";
import { message, Modal } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
export const EmployeeCardPage = observer(() => {
  const { confirm } = Modal;
  const { employeeStore } = useStores();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<Employee>();
  const [searchQuery, setSearchQuery] = useState<SearchRequest>(initSearch);
  const [filters, setFilters] = useState<EmployeeFilterState>({});
  const [data, setData] = useState<Employee[]>([]);
  const hasMore = employeeStore.pagination.page < employeeStore.pagination.totalPages;
  useEffect(() => {
    employeeStore.search(searchQuery);
  }, [employeeStore, searchQuery]);
  useEffect(() => {
    const isFirstPage = (searchQuery.page ?? 1) === 1;
    setData((prev) => (isFirstPage ? employeeStore.employees : [...prev, ...employeeStore.employees]));
  }, [employeeStore.employees, searchQuery.page]);
  const updateEmployee = (updatedEmployee: Employee) => {
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
    // Reset list and back to page 1 when filters change
    setData([]);
    setSearchQuery((prev) => ({ ...prev, page: 1, filters: newFilters }));
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
    const newFilters = { ...filters, fullName: value };
    setFilters(newFilters);
    // Reset list and back to page 1 for new search
    setData([]);
    setSearchQuery((prev) => ({ ...prev, page: 1, filters: newFilters }));
  };

  const handleAddEmployee = () => {
    resetForm();
    setIsEditMode(false);
    setIsAddMode(true);
  };
  const handleFormModalOk = (employee: Employee) => {
    if (isEditMode) {
      updateEmployee(employee);
      setData(employeeStore.employees);
    } else {
      addEmployee(employee);
    }

    setIsAddMode(false);
    setIsEditMode(false);
    resetForm();
    message.success("Lưu thông tin thành công");
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
  const handleLoadMore = () => {
    if (hasMore) {
      setSearchQuery((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }));
    }
  };

  const divLoad = (
    <div className={`flex justify-center items-center py-12`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">Đang tải...</span>
    </div>
  );

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

        {/* {!employeeStore.loading && ( */}
        <div id="scrollableDiv" className="h-screen overflow-y-auto">
          <InfiniteScroll
            dataLength={data.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={divLoad}
            endMessage={<p className="text-center mt-4">Hết danh sách</p>}
            scrollableTarget="scrollableDiv"
          >
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}
            >
              {data.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  highlight={employee.position?.toLowerCase() === "manager"}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* )} */}

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
    </>
  );
});
