import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { departments, positions } from "../models";

interface EmployeeHeaderProps {
  onSearch?: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onFilterChange?: (value: string) => void;
  onAdd?: () => void;
}

const EmployeeHeader = ({
  onSearch,
  searchTerm,
  setSearchTerm,
  onFilterChange,
  onAdd,
}: EmployeeHeaderProps) => {
  const handleSelectChange = (value: string) => {
    onFilterChange?.(value);
  };

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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onSearch={onSearch}
            allowClear
            enterButton="Tìm kiếm"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <Select
            allowClear
            placeholder="Lọc chức vụ"
            options={positions}
            onChange={handleSelectChange}
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <Select
            allowClear
            placeholder="Lọc theo phòng ban"
            options={departments}
            onChange={handleSelectChange}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;
