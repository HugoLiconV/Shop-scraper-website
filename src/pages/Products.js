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
import { Link } from "@reach/router";
import CardContainer from "../components/CardContainer";
import ProductList from "../components/ProductList";
import { useAsync } from "react-async";
import {
  getTrackedProducts,
  removeProduct,
  updateProduct
} from "../services/productClient";
import ErrorMessage from "../components/ErrorMessage";
import ErrorBoundary from "./ErrorBoundary";
import ProductTable from "../components/ProductTable";

const Products = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [item, setItem] = useState();
  const [desiredPrice, setDesiredPrice] = useState();
  const [visualization, setVisualization] = useState("list");

  const {
    data,
    isPending: isGetProductsPending,
    error: getProductsError,
    reload: reloadProducts,
    run: runGetProducts
  } = useAsync({
    promiseFn: getTrackedProducts,
    deferFn: getTrackedProducts,
    limit: 10,
    page: 1
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
  const total = (data && data.count) || 0;
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    total
  })
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

  function onPaginationChange(page) {
    if(page === pagination.page) return 
    setPagination({...pagination, page})
    runGetProducts(pagination);
  }

  function markProductAsBought(item) {
    runUpdateProduct({
      id: item.id,
      data: {
        ...item,
        wasPurchased: true,
        purchasedAt: item.product.price,
        notify: false // the user stop getting notifications
      }
    });
  }

  return (
    <ErrorBoundary>
      <CardContainer>
        <Typography.Title>Productos</Typography.Title>
        <div style={{display: 'flex', justifyContent: 'center'}}>
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
          <div style={{flex: 1}}/>
          <Link to="/purchased-products">Ir a productos comprados</Link>
        </div>
        <ErrorMessage error={getProductsError || removeError || updateError} />
        {visualization === "list" ? (
          <ProductList
            onRemove={onRemoveProduct}
            list={products}
            pagination={pagination}
            onUpdate={showEditDrawer}
            onPaginationChange={onPaginationChange}
            loading={isGetProductsPending || isRemovePending || isUpdatePending}
            markAsBought={markProductAsBought}
          />
        ) : (
          <ProductTable
            onRemove={onRemoveProduct}
            list={products}
            onUpdate={showEditDrawer}
            onPaginationChange={onPaginationChange}
            pagination={pagination}
            loading={isUpdatePending || isGetProductsPending || isRemovePending}
          />
        )}
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
    </ErrorBoundary>
  );
};

export default Products;
