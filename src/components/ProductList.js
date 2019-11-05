import React from "react";
import {
  List,
  Skeleton,
  Avatar,
  Typography,
  Icon,
  Popconfirm
} from "antd";
import { formatter } from "../utils/priceFormatter";

const ProductList = ({
  list,
  loading,
  onRemove,
  onUpdate,
  onPaginationChange,
  pagination
}) => {
  return (
    <List
      loading={loading}
      pagination={{
        position: "bottom",
        total: pagination.total,
        pageSize: pagination.limit,
        onChange: onPaginationChange
      }}
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => {
        const difference = item.product.price - item.desiredPrice;
        const negativeIcon = (
          <Icon type="caret-up" style={{ color: "#eb2f96" }} />
        );
        const positiveIcon = (
          <Icon type="caret-down" style={{ color: "#52c41a" }} />
        );
        return (
          <List.Item
            actions={[
              <Icon
                type="edit"
                theme="twoTone"
                twoToneColor="#52c41a"
                onClick={() => onUpdate(item)}
              />,
              <Popconfirm
                title="¿Seguro de que quieres eliminar este producto?"
                onConfirm={() => onRemove(item.id)}
              >
                <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
              </Popconfirm>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={
                  <a
                    href={item.product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.product.title}
                  </a>
                }
                description={
                  <>
                    <Typography.Paragraph>
                      Precio Actual: {formatter.format(item.product.price)}
                      <br />
                      Precio deseado: {formatter.format(item.desiredPrice)}
                    </Typography.Paragraph>
                  </>
                }
                avatar={
                  <Avatar
                    shape="square"
                    size="large"
                    src={item.product.image}
                    alt={item.product.title}
                  />
                }
              />
              <span>
                {formatter.format(difference)}{" "}
                {difference > 0 ? negativeIcon : positiveIcon}
              </span>
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );
};

export default ProductList;
