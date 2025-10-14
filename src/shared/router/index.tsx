import { createBrowserRouter } from "react-router-dom";
import { EmployeeCardPage } from "../../pages/employee/EmployeeCardPage";
import EmployeeEditPage from "../../pages/employee/EmployeeEditPage";
import NotFound from "../../pages/not-found/NotFound";
import MainLayout from "../layout/MainLayout";
import { EmployeeTablePage } from "../../pages/employee/EmployeeTablePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <NotFound />,
    children: [
      { index: true, element: <EmployeeTablePage /> },
      { path: "employees", element: <EmployeeTablePage /> },
      { path: "employee-cards", element: <EmployeeCardPage /> },
      { path: "employee-cards/:id", element: <EmployeeEditPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
