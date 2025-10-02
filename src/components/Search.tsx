import { useState } from "react";

interface SearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export const Search = ({
  onSearch,
  placeholder = "Tìm kiếm nhân viên...",
}: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-y-2 pl-3 flex items-center pointer-events-none">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg "
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
