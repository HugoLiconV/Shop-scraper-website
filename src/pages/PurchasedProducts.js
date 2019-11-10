import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import CardContainer from "../components/CardContainer";
import { Typography, Row, Col, Statistic, Icon } from "antd";
import { useAsync } from "react-async";
import { getPurchasedProducts } from "../services/productClient";
import ErrorMessage from "../components/ErrorMessage";
import PurchasedProductsList from "../components/PurchasedProductsList";
import BuyMeACoffeButton from "../components/BuyMeACoffeeButton";
import VCenter from "../components/Layouts/VCenter";
import styled from "styled-components";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid rgb(82, 196, 26);
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const PurchasedProducts = () => {
  const {
    data,
    isPending: isGetProductsPending,
    error: getProductsError
  } = useAsync({
    promiseFn: getPurchasedProducts,
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
              prefix={
                <span>
                  <Icon type={`caret-${getSavings > 0 ? "up" : "down"}`} />$
                </span>
              }
            />
          </Col>
        </Row>
        {getSavings > 0 && (
          <ErrorStyles>
            <VCenter>
              <Typography.Paragraph>
                Si ahorraste un poco de dinero usando pricer considera hacer una
                pequeña donación para ayudar con los costos de desarrollo.
              </Typography.Paragraph>
              <BuyMeACoffeButton />
            </VCenter>
          </ErrorStyles>
        )}
        <PurchasedProductsList list={products} loading={isGetProductsPending} />
        <ErrorMessage error={getProductsError} />
      </CardContainer>
    </ErrorBoundary>
  );
};

export default PurchasedProducts;
