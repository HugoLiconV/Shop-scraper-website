import React, { useState } from "react";
import { Typography, Card, Icon, InputNumber, Row, Col, Button } from "antd";
import { formatter } from "../utils/priceFormatter";
import Meta from "antd/lib/card/Meta";
import SentryButton from "./SentryButton";

const ProductResult = ({ product, addProduct, loading }) => {
  const [desiredPrice, setDesiredPrice] = useState(product.price);

  return (
    <Card
      style={{ maxWidth: 400, width: '100%' }}
      cover={
        <img
          alt={product.title}
          src={product.image || require("../assets/img/No-image-found.jpg")}
        />
      }
      actions={[
        <Button
          onClick={() => {
            addProduct(desiredPrice);
          }}
          disabled={loading}
          loading={loading}
        >
          <Icon type="plus" key="plus" />
          Agregar
        </Button>
      ]}
    >
      <Meta
        title={product.title}
        description={
          <div>
            <Typography.Text type="secondary">
              {formatter.format(product.price)}
            </Typography.Text>
            <Row type="flex" gutter={10} align="middle">
              <Col span={12}>
                <Typography.Text>Precio deseado:</Typography.Text>
              </Col>
              <Col span={12}>
                <InputNumber
                  defaultValue={1000}
                  max={product.price - 1}
                  min={0}
                  step={Math.round(product.price * 0.05)}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder="Precio deseado"
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={setDesiredPrice}
                  value={desiredPrice}
                />
              </Col>
            </Row>
          </div>
        }
      />
      <SentryButton title="¿Algún problema con tu producto?" message={product.link} tags={['product-error']}/>
    </Card>
  );
};

export default ProductResult;
