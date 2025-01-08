import React from "react";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilters from "./UsersFilters";
import { PlusOutlined } from "@ant-design/icons";

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
  const [drawerOpen, setDrawerOpen] = React.useState(false);
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

        <UsersFilters
          onFilterChange={(filterName, filterValue) => {
            console.log(filterName, filterValue);
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Create User
          </Button>
        </UsersFilters>

        <Table columns={columns} dataSource={users} rowKey={"id"} />

        <Drawer
          title="Create User"
          width={720}
          open={drawerOpen}
          destroyOnClose={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button type="default">Cancel</Button>
              <Button type="primary">Submit</Button>
            </Space>
          }
        >
          <p>aaaa</p>
        </Drawer>
      </Space>
    </>
  );
}
