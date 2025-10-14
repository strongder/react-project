import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header cố định */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="flex-1 mt-16 overflow-y-auto p-10 bg-white shadow-inner rounded-t-2xl">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
