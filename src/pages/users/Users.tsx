import { Breadcrumb, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => (
      <div>
        {record.firstName} {record.lastName}
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

export default function Users() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers().then((res) => res.data);
    },
  });

  const { user } = useAuthStore();
  if (user?.role !== "admin") {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <Breadcrumb
          items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
          separator={<RightOutlined />}
        />
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}

        <Table columns={columns} dataSource={users} />
      </Space>
    </>
  );
}
