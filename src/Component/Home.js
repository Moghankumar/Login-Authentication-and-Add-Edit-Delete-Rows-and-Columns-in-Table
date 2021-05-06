import { Button, Typography } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AedTable from "./AedTable";
import AEDTable2 from "./AEDTable2";
import { LogoutOutlined } from "@ant-design/icons";

const { Title } = Typography;

export class Home extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Title level={3} strong>
            Welcome! &nbsp;
            {localStorage.getItem("name")}
          </Title>
          <Title level={3} type="success" strong>
            NFN Labs Task
          </Title>
          <Link to="/">
            <Button
              type="primary"
              onClick={() => {
                localStorage.setItem("show", false);
              }}
            >
              Logout <LogoutOutlined twoToneColor="#eb2f96" />
            </Button>
          </Link>
        </div>
        <AedTable />
        <AEDTable2 />
      </div>
    );
  }
}

export default Home;
