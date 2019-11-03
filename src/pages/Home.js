import React from "react";
import { Typography, Col, Row, message } from "antd";
import CardContainer from "../components/CardContainer";
import SearchProduct from "../components/SearchProduct";
import ProductResult from "../components/ProductResult";
import HCenter from "../components/Layouts/HCenter";
import { searchProduct, addProduct } from "../services/productClient";
import { useAsync } from "react-async";
import ErrorMessage from "../components/ErrorMessage";

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
    onResolve: () => message.success(`${product.title} agregado a tus productos`)
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
    runAddProduct({ desiredPrice, product: {...product, } });
  }

  return (
    <>
      <Typography.Title level={1}>Pricer</Typography.Title>
      <Row gutter={20}>
        <Col sm={24} md={{ span: 10, offset: 7 }}>
          <CardContainer>
            <SearchProduct
              onSearch={onProductSearch}
              loading={isSearchPending}
            />
            <HCenter>
              {product && !isSearchPending && (
                <ProductResult
                  product={product}
                  addProduct={onAddProduct}
                  loading={isAddingPending}
                />
              )}
              <ErrorMessage error={searchError || addingError} />
            </HCenter>
          </CardContainer>
        </Col>
      </Row>
    </>
  );
};

export default Home;
