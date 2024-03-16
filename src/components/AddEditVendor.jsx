"use client";
import React, { useContext, useEffect } from "react";

import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Layout,
  Row,
  notification,
} from "antd";
import { AppContext } from "../../context";
import { useParams, useRouter } from "next/navigation";
import SubVendorList from "./SubVendorList";

const AddEditVendor = () => {
  const { appState, setAppState } = useContext(AppContext);
  const [form] = Form.useForm();
  const { id } = useParams();
  const router = useRouter();

  const onFinish = (values) => {
    console.log("values", values);

    if (+id > 0) {
      const filterData = appState.filter((dt) => +id !== dt.vendorId);
      setAppState([...filterData, { ...values, vendorId: +id }]);
      notification.success({
        message: "Success",
        description: "Vendor Update Successfully",
      });
    } else {
      const vendorId = appState.length + 1;
      setAppState((prev) => [...prev, { ...values, vendorId }]);
      notification.success({
        message: "Success",
        description: "Vendor Created Successfully",
      });
    }
    router.push("/dashboard");
  };
  useEffect(() => {
    console.log(id);
    if (+id === 0) return;
    const filterData = appState.filter((dt) => +id === dt.vendorId);
    form.setFieldsValue(filterData[0]);
  }, [id]);
  return (
    <Layout className="">
      <Form
        size="large"
        name="normal_login"
        initialValues={{ subvendor: [{}] }}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[24, 24]}>
          <Col md={12}>
            <Form.Item
              labelCol={{ md: { span: 12 } }}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter Username!",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              labelCol={{ md: { span: 12 } }}
              name="textArea"
              rules={[
                {
                  required: true,
                  message: "Please enter Username!",
                },
              ]}
            >
              <Input.TextArea rows={1} placeholder="textArea" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <SubVendorList form={form} />
          </Col>
          <Col span={24}>
            <Flex gap={24} justify="center">
              <Form.Item>
                <Button onClick={() => router.back()} type="default">
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full text-[1.3rem] bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  {id > 0 ? "Update" : "Submit"}
                </Button>
              </Form.Item>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default AddEditVendor;
