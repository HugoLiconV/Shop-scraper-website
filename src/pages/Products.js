import React, { useState } from "react";
import {
  Typography,
  Radio,
  Icon,
  Drawer,
  InputNumber,
  Button,
  message
} from "antd";
import CardContainer from "../components/CardContainer";
import ProductList from "../components/ProductList";
import { useAsync } from "react-async";
import {
  getTrackedProducts,
  removeProduct,
  updateProduct
} from "../services/productClient";
import ErrorMessage from "../components/ErrorMessage";

const Products = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [item, setItem] = useState();
  const [desiredPrice, setDesiredPrice] = useState();
  const [visualization, setVisualization] = useState("list");

  const {
    data,
    isPending: isGetProductsPending,
    error: getProductsError,
    reload: reloadProducts
  } = useAsync({
    promiseFn: getTrackedProducts
  });
  const {
    isPending: isRemovePending,
    error: removeError,
    run: runRemoveProduct
  } = useAsync({
    deferFn: removeProduct,
    onResolve: onResolveRemove
  });

  const {
    isPending: isUpdatePending,
    error: updateError,
    run: runUpdateProduct
  } = useAsync({
    deferFn: updateProduct,
    onResolve: onResolveUpdate
  });

  const products = (data && data.products) || [];

  function onResolveUpdate() {
    message.success("Producto actualizado con éxito");
    setShowDrawer(false);
    reloadProducts();
  }

  function onResolveRemove() {
    message.success("Producto eliminado con éxito");
    reloadProducts();
  }

  function onDrawerClose() {
    setShowDrawer(false);
  }

  function onVisualizationChange(e) {
    setVisualization(e.target.value);
  }

  function onRemoveProduct(id) {
    runRemoveProduct(id);
  }

  function showEditDrawer(item) {
    setItem(item);
    setShowDrawer(true);
    setDesiredPrice(item.desiredPrice);
  }

  return (
    <CardContainer>
      <Typography.Title>Productos</Typography.Title>
      <Radio.Group
        defaultValue={visualization}
        onChange={onVisualizationChange}
        buttonStyle="solid"
      >
        <Radio.Button value="list">
          <Icon type="unordered-list" /> Lista
        </Radio.Button>
        <Radio.Button value="table">
          <Icon type="table" /> Tabla
        </Radio.Button>
      </Radio.Group>
      <ErrorMessage error={getProductsError || removeError || updateError} />
      {visualization === "list" ? (
        <ProductList
          onRemove={onRemoveProduct}
          list={products}
          onEditClick={showEditDrawer}
          loading={isGetProductsPending || isRemovePending}
        />
      ) : null}
      <Drawer
        title={`Actualizar ${
          item && item.product && item.product.title
            ? item.product.title
            : "producto"
        }`}
        placement="bottom"
        closable={false}
        onClose={onDrawerClose}
        visible={showDrawer}
      >
        <InputNumber
          defaultValue={1000}
          max={(item && item.product && item.product.price - 1) || 0}
          min={0}
          step={Math.round(
            (item && item.product && item.product.price * 0.05) || 0
          )}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          placeholder="Precio deseado"
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          onChange={setDesiredPrice}
          value={desiredPrice}
          style={{ marginBottom: 16, marginRight: 16 }}
        />
        <br />
        <Button
          type="primary"
          onClick={() =>
            runUpdateProduct({
              id: item.id,
              data: {
                ...item,
                desiredPrice
              }
            })
          }
          loading={isUpdatePending}
        >
          Actualizar
        </Button>
      </Drawer>
    </CardContainer>
  );
};

export default Products;
