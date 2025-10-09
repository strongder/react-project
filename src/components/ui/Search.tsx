import { useState } from "react";
import SearchIcon from "../../assets/icon/SearchIcon.svg";
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
        <img src={SearchIcon} alt="Search" className="h-5 w-5 text-gray-400" />
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
