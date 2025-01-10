import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import { Tenant } from "../../../types";

export default function UserForm() {
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getTenants().then((res) => res.data);
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size={"large"}>
          <Card title="Basic Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name={"firstName"}
                  rules={[
                    {
                      required: true,
                      message: "First name is required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name={"lastName"}
                  rules={[
                    {
                      required: true,
                      message: "Last name is required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name={"email"}
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                    {
                      type: "email",
                      message: "Email is not valid",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Security Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Role">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name={"role"}
                  rules={[
                    {
                      required: true,
                      message: "Role is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    allowClear={true}
                    placeholder={"Select Role"}
                    style={{ width: "100%" }}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "manager", label: "Manager" },
                      { value: "customer", label: "Customer" },
                    ]}
                    onChange={() => {}}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Restaurant"
                  name={"tenantId"}
                  rules={[
                    {
                      required: true,
                      message: "Restaurant is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    allowClear={true}
                    placeholder={"Select Restaurant"}
                    style={{ width: "100%" }}
                    options={tenants?.map((tenant: Tenant) => ({
                      value: tenant?.id,
                      label: tenant?.name,
                    }))}
                    onChange={() => {}}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}
