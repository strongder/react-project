import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { departments, positions, status, type EmployeeFilterState } from "../models";

interface EmployeeHeaderProps {
  onSearch?: (value: string) => void;
  filters: EmployeeFilterState;
  onFilterChange?: (value: EmployeeFilterState) => void;
  onAdd?: () => void;
}

const EmployeeHeader = ({
  onSearch,
  filters,
  onFilterChange,
  onAdd,
}: EmployeeHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách nhân viên
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý thông tin nhân viên trong hệ thống
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            Thêm nhân viên
          </Button>
        </div>
      </div>

      <div className="flex items-end flex-col justify-between lg:flex-row gap-16 p-6  bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
        <div className="w-full lg:w-1/3">
          <Input.Search
            placeholder="Tìm kiếm theo tên"
            onSearch={onSearch}
            allowClear
            enterButton="Tìm kiếm"
          />
        </div>
        <div className="w-full lg:w-1/4">
          <Select
            allowClear
            value={filters.position}
            placeholder="Lọc chức vụ"
            options={positions}
            onChange={(value) =>
              onFilterChange && onFilterChange({ position: value })
            }
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-1/4">
          <Select
            allowClear
            value={filters.department}
            placeholder="Lọc theo phòng ban"
            options={departments}
            onChange={(value) =>
              onFilterChange && onFilterChange({ department: value })
            }
            className="w-full"
          />
        </div><div className="w-full lg:w-1/4">
          <Select
            allowClear
            value={filters.status}
            placeholder="Lọc trạng thái"
            options={status}
            onChange={(value) =>
              onFilterChange && onFilterChange({ status: value })
            }
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;
