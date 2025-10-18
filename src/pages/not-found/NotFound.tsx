import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto text-center py-20">
      <div className="text-4xl">😢</div>
      <h1 className="text-3xl text-black-500 mt-2">
        404 - Không tìm thấy trang
      </h1>
      <p className="text-gray-500 mb-4">Trang bạn truy cập không tồn tại.</p>
      <Button type="primary" onClick={() => navigate("/")}>
        Về trang chủ
      </Button>
    </div>
  );
}

export default NotFound;
