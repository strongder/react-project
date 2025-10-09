import React from "react";
import type { Employee } from "../../models";

interface EmployeeStaticProps {
  employees: Employee[];
}

const EmployeeStatic = ({ employees }: EmployeeStaticProps) => {
    console.log("employees", employees);
  const position = React.useMemo(() => {
 
    const positionCount: Record<string, number> = {};
    employees.forEach(employee => {
        const position = employee.position;
        positionCount[position] = (positionCount[position] || 0) + 1;
    });
    return positionCount;
  }, [employees]);

  return (
    <div className="mt-8 text-center bg-white rounded-lg shadow-sm border border-gray-200 inline-block p-4 self-start">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Số lượng nhân viên</h2>
      <div className="space-y-2 min-w-[250px]">
        {Object.entries(position).map(([pos, count]) => (
          <div key={pos} className="flex justify-between items-center">
            <span className="text-gray-700">{pos}:</span>
            <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm ml-4">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(EmployeeStatic);
