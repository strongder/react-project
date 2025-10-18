import { Card, Statistic, Row, Col, Table } from "antd";
import { useStores } from "../../stores";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const HomeDashboard = observer(() => {
  const { employeeStore } = useStores();
  useEffect(() => {
    employeeStore.getAll();
  }, [employeeStore]);
  const employeeAll = employeeStore.employeeAll || [];

  // Tổng số nhân viên
  const totalEmployees = employeeAll.length;

  // Tổng số nhân viên đang hoạt động
  const activeEmployees = employeeAll.filter(
    (emp) => emp.status === "active"
  ).length;

  // Tổng số nhân viên nghỉ việc
  const inactiveEmployees = employeeAll.filter(
    (emp) => emp.status === "inactive"
  ).length;

  // Thống kê số lượng nhân viên từng phòng ban
  const departmentStats = employeeAll
    .filter((emp) => emp.status === "active")
    .reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const departmentData = Object.entries(departmentStats).map(
    ([dept, count]) => ({
      key: dept,
      department: dept,
      count,
    })
  );

  const postitionStats = employeeAll
    .filter((emp) => emp.status === "active")
    .reduce((acc, emp) => {
      acc[emp.position] = (acc[emp.position] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const positionData = Object.entries(postitionStats).map(
    ([position, count]) => ({
      key: position,
      position: position,
      count,
    })
  );

  return (
    <div className="container mx-auto py-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white transition-colors duration-300">
        Dashboard nhân viên
      </h1>

      <Row gutter={16} className="mb-8">
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số nhân viên"
              value={totalEmployees}
              valueStyle={{ fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang hoạt động"
              value={activeEmployees}
              valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="Nghỉ việc"
              value={inactiveEmployees}
              valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Nhân viên theo phòng ban" className="mb-8">
            <Table
              dataSource={departmentData}
              columns={[
                {
                  title: "Phòng ban",
                  dataIndex: "department",
                  key: "department",
                },
                { title: "Số lượng", dataIndex: "count", key: "count" },
              ]}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Nhân viên theo vị trí" className="mb-8">
            <Table
              dataSource={positionData}
              columns={[
                {
                  title: "Phòng ban",
                  dataIndex: "position",
                  key: "position",
                },
                { title: "Số lượng", dataIndex: "count", key: "count" },
              ]}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default HomeDashboard;
