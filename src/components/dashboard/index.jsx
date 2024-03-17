import {
  Button,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Modal,
  Row,
  Table,
  Typography,
  notification,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context";

import { useRouter } from "next/navigation";

const { useBreakpoint } = Grid;

const DashboardPage = () => {
  const screens = useBreakpoint();
  const { appState, setAppState } = useContext(AppContext);
  const router = useRouter();

  const deleteVendor = (id) => {
    const filterData = appState.filter((ft) => +id !== +ft.vendorId);
    setAppState(filterData);
    notification.success({
      message: "Success",
      description: "Vendor Deleted Successfully",
    });
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
        scroll={{ x: !screens.xl || screens.xxl }}
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const expandedRowRender = (data) => {
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
        scroll={{ x: !screens.xl || screens.xxl }}
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      fixed: "right",
      key: "action",
      width: "10%",
      render: (subVendor) => (
        <Flex gap={24}>
          <EditFilled
            onClick={() => router.push(`/add-edit/${subVendor?.vendorId}`)}
          />
          <span className=" p-2">
            <DeleteFilled
              style={{ color: "red" }}
              onClick={() => deleteConfirm(subVendor)}
            />
          </span>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <span className="flex mb-4 border-separate justify-end">
        <Button
          className=" text-[1.3rem] bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          size="large"
          type="primary"
          onClick={() => router.push("/add-edit/0")}
        >
          + Add Vendor
        </Button>
      </span>
      <Table
        // dataSource={appState.reverse()}
        dataSource={[...appState].reverse()}
        scroll={{ x: !screens.xl || screens.xxl }}
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
