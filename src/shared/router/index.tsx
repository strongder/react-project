import { createBrowserRouter } from "react-router-dom";
import { EmployeeCardPage } from "../../pages/employee/EmployeeCardPage";
import NotFound from "../../pages/not-found/NotFound";
import MainLayout from "../layout/MainLayout";
import { EmployeeTablePage } from "../../pages/employee/EmployeeTablePage";
import { EmployeeEditPage } from "../../pages/employee/EmployeeEditPage";
import LoginPage from "../../pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <EmployeeTablePage /> },
      { path: "employees", element: <EmployeeTablePage /> },
      { path: "employee-cards", element: <EmployeeCardPage /> },
      { path: "employees/edit/:id", element: <EmployeeEditPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Auth pages
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
