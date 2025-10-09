import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  options: FilterOption[];
  placeholder?: string;
  onFilterChange?: (selectedValue: string) => void;
  className?: string;
  label?: string;
}

export const Filter = ({
  options,
  placeholder = "Chọn bộ lọc",
  onFilterChange,
  className = "",
  label
}: FilterProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onFilterChange?.(value);
  };

  return (
    <div className={`flex-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export types for reuse
export type { FilterOption, FilterProps };
