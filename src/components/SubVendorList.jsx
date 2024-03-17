import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
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
    <Form.List
      name="subvendor"
      rules={[
        {
          validator: (_, value) => {
            if (value.length < 1) {
              return Promise.reject(
                new Error("At least one vendor is required")
              );
            } else {
              return Promise.resolve();
            }
          },
        },
      ]}
    >
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
                fields.length > 1 && (
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                )
              }
            >
              <Row gutter={[24, 16]}>
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
                <Divider className="m-0" />
                <Col xl={12}>
                  <Form.Item>
                    <Form.List
                      initialValue={[{}]}
                      name={[field.name, "verients"]}
                      rules={[
                        {
                          validator: (_, value) => {
                            if (value.length < 1) {
                              return Promise.reject(
                                new Error("At least one verient is required")
                              );
                            } else {
                              return Promise.resolve();
                            }
                          },
                        },
                      ]}
                    >
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Row gutter={[24, 0]} key={subField.key}>
                              <Col md={11} xl={12}>
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
                              <Col md={2} xl={1}>
                                {subFields.length > 1 && (
                                  <MinusCircleOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                )}
                              </Col>
                              <Col xs={16} md={8}></Col>
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
