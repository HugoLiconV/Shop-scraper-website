import React from "react";
import { Form, Input, Icon, Select, Button, Typography } from "antd";
import HCenter from "./Layouts/HCenter";
import { STORES } from "../constants";

const SearchProduct = ({ form, onSearch, loading }) => {
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSearch(values)
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Typography.Title level={3}>Buscar producto</Typography.Title>
      <Form.Item label="Tienda">
        {getFieldDecorator("store", {
          rules: [{ required: true, message: "Selecciona la tienda" }]
        })(
          <Select placeholder="Selecciona la tienda en la que buscas el producto">
            {STORES.map(({value, name}) => ( 
              <Select.Option key={value} value={value}>{name}</Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("link", {
          rules: [{ required: true, message: "Introduce la URL del producto" }]
        })(
          <Input
            prefix={<Icon type="link" />}
            type="url"
            placeholder="Url del producto a buscar"
          />
        )}
      </Form.Item>
      <Form.Item>
        <HCenter>
          <Button type="primary" icon="search" htmlType="submit" loading={loading}>
            Buscar
          </Button>
        </HCenter>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "SearchProduct" })(SearchProduct);
