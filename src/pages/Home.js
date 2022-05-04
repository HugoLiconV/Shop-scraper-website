import React from "react";
import { Typography, Col, Row, message, Alert } from "antd";
import CardContainer from "../components/CardContainer";
import SearchProduct from "../components/SearchProduct";
import ProductResult from "../components/ProductResult";
import HCenter from "../components/Layouts/HCenter";
import { searchProduct, addProduct } from "../services/productClient";
import { useAsync } from "react-async";
import ErrorMessage from "../components/ErrorMessage";
import ErrorBoundary from "./ErrorBoundary";
import SentryButton from "../components/SentryButton";

const Home = ({ user }) => {
  const {
    isPending: isSearchPending,
    error: searchError,
    data: searchData,
    run: runSearchProduct
  } = useAsync({
    deferFn: searchProduct
  });

  const {
    isPending: isAddingPending,
    error: addingError,
    run: runAddProduct
  } = useAsync({
    deferFn: addProduct,
    onResolve: () =>
      message.success(`${product.title} agregado a tus productos`)
  });

  const product = searchData && searchData.product;

  // We don't use these variables to render anything so we don't need to use useState

  async function onProductSearch(values) {
    runSearchProduct(values);
  }

  async function onAddProduct(desiredPrice) {
    if (!user) {
      message.error("Necesitas iniciar sesión para poder agregar productos");
      return;
    }
    runAddProduct({ desiredPrice, product: { ...product } });
  }

  return (
    <ErrorBoundary>
      <Row gutter={20}>
        <Col sm={24} lg={{ span: 10, offset: 7 }}>
          <CardContainer>
            <Typography.Title level={1}>Pricer</Typography.Title>
            <Alert
              style={{ marginBottom: 16 }}
              description={`
              Actualmente el servidor de hotmail.com está bloqueando el envío de correos. 
              Si quieres recibir las notificaciones actualiza tu correo por uno de Gmail mientras se resuelve este problema.
            `}
              type="warning"
              showIcon
            />
            <Typography.Paragraph>
              Pricer te permite recibir alertas cuando un producto baja de
              precio por un valor que tu estableciste. Actualmente tiene soporte
              para: Amazon, Best Buy, Coppel, Costco, Cyber Puerta, DD Tech,
              Liverpool y Sears.
            </Typography.Paragraph>
            <SentryButton
              message="[store request]"
              tags={["store request"]}
              title="Solicitar soporte de tienda"
            />
          </CardContainer>
        </Col>
        <Col sm={24} lg={{ span: 10, offset: 7 }}>
          <CardContainer>
            <button onClick={() => {
              throw new Error("I'm Evil");
            }}>Bomb </button>
            <SearchProduct
              onSearch={onProductSearch}
              loading={isSearchPending}
            />
            <HCenter>
              {product && !searchError && !isSearchPending && (
                <ProductResult
                  product={product}
                  addProduct={onAddProduct}
                  loading={isAddingPending}
                />
              )}
              {!isSearchPending && !isAddingPending && (
                <ErrorMessage error={searchError || addingError} />
              )}
            </HCenter>
          </CardContainer>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default Home;
