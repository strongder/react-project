import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header cố định */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="flex-1 mt-16 overflow-y-auto p-10 bg-white shadow-inner bg-white dark:bg-gray-800 transition-colors duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
