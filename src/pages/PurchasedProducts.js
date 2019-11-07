import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import CardContainer from "../components/CardContainer";
import { Typography, Row, Col, Statistic, Icon, Divider } from "antd";
import { useAsync } from "react-async";
import { getPurchasedProducts } from "../services/productClient";
import ErrorMessage from "../components/ErrorMessage";
import PurchasedProductsList from "../components/PurchasedProductsList";

const PurchasedProducts = () => {
  const {
    data,
    isPending: isGetProductsPending,
    error: getProductsError,
    run: runGetProducts
  } = useAsync({
    promiseFn: getPurchasedProducts,
    deferFn: getPurchasedProducts,
  });

  const products = (data && data.products) || [];
  const total = (data && data.count) || 0;


  const getSavings = React.useMemo(() => {
    return products.reduce(
      (prev, product) => product.initialPrice - product.purchasedAt + prev,
      0
    );
  }, [products]);

  return (
    <ErrorBoundary>
      <CardContainer>
        <Typography.Title>Productos comprados</Typography.Title>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Productos comprados"
              value={total}
              prefix={<Icon type="shopping" />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total ahorrado"
              value={getSavings}
              precision={2}
              valueStyle={{ color: getSavings > 0 ? "#52c41a" : "#eb2f96" }}
              prefix={<span><Icon type={`caret-${getSavings > 0 ? 'up' : 'down'}`} />$</span>}
            />
          </Col>
        </Row>
        <Divider />
        <PurchasedProductsList
          list={products}
          loading={isGetProductsPending}
        />
        <ErrorMessage error={getProductsError} />
      </CardContainer>
    </ErrorBoundary>
  );
};

export default PurchasedProducts;
