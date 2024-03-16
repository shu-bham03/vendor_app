import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Typography,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import Context, { AppContext } from "../../../context";
import Layout from "antd/es/layout/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
const { Text } = Typography;
const DashboardPage = () => {
  const { appState, setAppState } = useContext(AppContext);
  const router = useRouter();

  const deleteVendor = (id) => {
    const filterData = appState.filter((ft) => +id !== +ft.vendorId);
    setAppState(filterData);
  };

  const deleteConfirm = (subVendor) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete this vendor",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      onOk() {
        deleteVendor(subVendor.vendorId);
      },
    });
  };

  const expandedRowRender2 = (data) => {
    console.log("first", data);
    const columns = [
      {
        title: "Verient",
        dataIndex: "verient",
        key: "verient",
      },
      {
        title: "Number",
        dataIndex: "number",
        key: "number",
      },
    ];

    return (
      <Table
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const expandedRowRender = (data) => {
    console.log("first", data);
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Main",
        dataIndex: "main",
        key: "main",
        render: (isMain) => (isMain ? "Yes" : "No"),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record, index) => index}
        expandable={{
          expandedRowRender: (record) => expandedRowRender2(record?.verients),
          defaultExpandedRowKeys: ["0"],
        }}
      />
    );
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Action",
      fixed: "right",
      key: "action",
      width: 40,
      render: (subVendor) => (
        <Flex gap={24}>
          <EditFilled
            onClick={() => router.push(`/add-edit/${subVendor?.vendorId}`)}
          />
          <span className="bg-red p-2">
            <DeleteFilled onClick={() => deleteConfirm(subVendor)} />
          </span>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <span className="flex mb-4 border-separate justify-end">
        <Button
          size="large"
          type="default"
          onClick={() => router.push("/add-edit/0")}
        >
          + Add Vendor
        </Button>
      </span>
      <Table
        dataSource={appState}
        columns={columns}
        rowKey={(record, index) => index}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record?.subvendor),
          defaultExpandedRowKeys: ["0"],
        }}
      />
    </>
  );
};

export default DashboardPage;
