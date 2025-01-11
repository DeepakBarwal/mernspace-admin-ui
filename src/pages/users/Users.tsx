import React from "react";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../../http/api";
import { CreateUserData, User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilters from "./UsersFilters";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";

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
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

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

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

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
              <Button
                type="default"
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
          styles={{
            body: {
              background: colorBgLayout,
            },
          }}
        >
          <Form layout="vertical" form={form}>
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
}
