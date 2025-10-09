interface EmployeeFooterProps {
  totalEmployees: number;
}

const EmployeeFooter = ({ totalEmployees }: EmployeeFooterProps) => {
  const getCurrentDate = (): string => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <footer className="bg-white shadow-inner border-t border-gray-200 py-6 mt-8">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
        <p className="text-gray-700">
          Tổng cộng{" "}
          <span className="font-semibold text-gray-900">{totalEmployees}</span>{" "}
          nhân viên – đã cập nhật{" "}
          <span className="font-semibold text-gray-900">
            {getCurrentDate()}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default EmployeeFooter;
