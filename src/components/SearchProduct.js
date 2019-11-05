import React, { useState } from "react";
import { Form, Input, Icon, Select, Button, Typography } from "antd";
import HCenter from "./Layouts/HCenter";
import { STORES } from "../constants";
import ErrorMessage from "./ErrorMessage";

const SearchProduct = ({ form, onSearch, loading }) => {
  const { getFieldDecorator } = form;
  const [error, setError] = useState('')

  function getStoreFromLink(link = "") {
    setError('')
    if (link.includes("www.amazon.com.mx")) {
      return "amazon";
    }
    if (link.includes("www.bestbuy.com.mx")) {
      return "bestbuy";
    }
    if (link.includes("www.coppel.com")) {
      return "coppel";
    }
    if (link.includes("www.costco.com.mx")) {
      return "costco";
    }
    if (link.includes("www.cyberpuerta.mx")) {
      return "cyberpuerta";
    }
    if (link.includes("ddtech.mx")) {
      return "ddtech";
    }
    if (link.includes("www.liverpool.com.mx")) {
      return "liverpool";
    }
    if (link.includes("www.sears.com.mx")) {
      return "sears";
    }
    setError("El link no coincide con ninguna de las tiendas disponibles.");
  }

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, {link}) => {
      if (!err) {
        const store = getStoreFromLink(link)
        if (store) {
          onSearch({link, store});
        }
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Typography.Title level={3}>Buscar producto</Typography.Title>
      {/* <Form.Item label="Tienda">
        {getFieldDecorator("store", {
          rules: [{ required: true, message: "Selecciona la tienda" }]
        })(
          <Select placeholder="Selecciona la tienda en la que buscas el producto">
            {STORES.map(({ value, name }) => (
              <Select.Option key={value} value={value}>
                {name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item> */}
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
          <Button
            type="primary"
            icon="search"
            htmlType="submit"
            loading={loading}
          >
            Buscar
          </Button>
        </HCenter>
        <HCenter>
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
        </HCenter>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "SearchProduct" })(SearchProduct);
