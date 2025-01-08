import { Card, Col, Input, Row, Select } from "antd";
import React from "react";

type UsersFiltersProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children?: React.ReactNode;
};

export default function UsersFilters({
  onFilterChange,
  children,
}: UsersFiltersProps) {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Input.Search
                allowClear={true}
                placeholder="Search"
                onChange={(e) =>
                  onFilterChange("UserSearchQuery", e.target.value)
                }
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                placeholder={"Select Role"}
                style={{ width: "100%" }}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "manager", label: "Manager" },
                  { value: "customer", label: "Customer" },
                ]}
                onChange={(selectedItem) =>
                  onFilterChange("RoleFilter", selectedItem)
                }
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear={true}
                placeholder={"Status"}
                style={{ width: "100%" }}
                options={[
                  { value: "ban", label: "Ban" },
                  { value: "active", label: "Active" },
                ]}
                onChange={(selectedItem) =>
                  onFilterChange("StatusFilter", selectedItem)
                }
              />
            </Col>
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
