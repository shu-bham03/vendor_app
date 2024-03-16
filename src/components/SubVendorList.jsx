import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";
import React, { useState } from "react";

const validateVariant = (rule, value, callback) => {
  if (!value) {
    callback("Please enter a variant.");
  } else {
    callback();
  }
};

const validateNumber = (rule, value, callback) => {
  if (!value) {
    callback("Please enter a number.");
  } else if (isNaN(value)) {
    callback("Please enter a valid number.");
  } else {
    callback();
  }
};

const SubVendorList = ({ form }) => {
  //   const [form] = Form.useForm();
  return (
    <Form.List name="subvendor">
      {(fields, { add, remove }) => (
        <div
          style={{
            display: "flex",
            rowGap: 16,
            flexDirection: "column",
          }}
        >
          {fields.map((field, index) => (
            <Card
              bordered
              size="small"
              title={`Vendor ${field.name + 1}`}
              key={field.key}
              extra={
                <CloseOutlined
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              }
            >
              <Row gutter={[24, 24]}>
                <Col md={12}>
                  <Form.Item
                    label="Vendor Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a vendor name.",
                      },
                    ]}
                    // fieldKey={[field.fieldKey, 'name']}
                    name={[field.name, "name"]}
                  >
                    <Input placeholder="name" />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    // fieldKey={[field.fieldKey, 'main']}
                    name={[field.name, "main"]}
                    // valuePropName="checked"
                  >
                    <Checkbox
                      checked={form.getFieldValue(["subvendor", index, "main"])}
                      onChange={(e) => {
                        form.setFieldsValue({
                          subvendor: form
                            .getFieldValue("subvendor")
                            .map((item, idx) => ({
                              ...item,
                              main: idx === index ? e.target.checked : false,
                            })),
                        });
                      }}
                    >
                      Is Main
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item>
                    <Form.List name={[field.name, "verients"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Row gutter={[24, 24]} key={subField.key}>
                              <Col md={11}>
                                <Form.Item
                                  label="Varient"
                                  name={[subField.name, "verient"]}
                                  rules={[{ validator: validateVariant }]}
                                >
                                  <Input placeholder="verient" />
                                </Form.Item>
                              </Col>
                              <Col md={11}>
                                <Form.Item
                                  label="number"
                                  name={[subField.name, "number"]}
                                  rules={[{ validator: validateNumber }]}
                                >
                                  <InputNumber
                                    className="w-full"
                                    placeholder="number"
                                  />
                                </Form.Item>
                              </Col>
                              <Col md={2}>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Col>
                            </Row>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Varient
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}

          <Button type="dashed" onClick={() => add()} block>
            + Add Vendor
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default SubVendorList;
