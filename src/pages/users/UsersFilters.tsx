import { Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";

type UsersFiltersProps = {
  children?: React.ReactNode;
};

export default function UsersFilters({ children }: UsersFiltersProps) {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name={"q"}>
                <Input.Search allowClear={true} placeholder="Search" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"role"}>
                <Select
                  allowClear={true}
                  placeholder={"Select Role"}
                  style={{ width: "100%" }}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "manager", label: "Manager" },
                    { value: "customer", label: "Customer" },
                  ]}
                />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Select
                allowClear={true}
                placeholder={"Status"}
                style={{ width: "100%" }}
                options={[
                  { value: "ban", label: "Ban" },
                  { value: "active", label: "Active" },
                ]}
              />
            </Col> */}
          </Row>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {children}
        </Col>
      </Row>
    </Card>
  );
}
