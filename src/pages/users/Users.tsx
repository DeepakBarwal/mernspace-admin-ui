import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router";

export default function Users() {
  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
      />
    </>
  );
}
