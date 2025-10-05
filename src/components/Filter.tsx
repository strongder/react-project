import { useState } from "react";

interface FilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  position?: string;
}

const positions = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "tester", label: "Tester" },
  { value: "manager", label: "Manager" },
];

export const Filter = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({});

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };
  return (
    <select
      id="default"
      value={filters.position}
      className="h-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      onChange={(e) => handleFilterChange("position", e.target.value)}
    >
      <option value="">Chọn chức vụ</option>
      {positions.map((pos) => (
        <option key={pos.value} value={pos.value}>
          {pos.label}
        </option>
      ))}
    </select>
  );
};
