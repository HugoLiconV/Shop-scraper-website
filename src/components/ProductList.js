import React from "react";
import {
  List,
  Skeleton,
  Avatar,
  Typography,
  Icon,
  Popconfirm,
  Tag
} from "antd";
import { formatter } from "../utils/priceFormatter";

const ProductList = ({
  list,
  loading,
  onRemove,
  onUpdate,
  onPaginationChange,
  pagination,
  markAsBought
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
        const src = item.product.image || require("../assets/img/No-image-found.jpg");
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
              </Popconfirm>,
              <div onClick={() => markAsBought(item)}>
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                  style={{ marginRight: 8 }}
                />
                Marcar como comprado
              </div>
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
                    {item.product.title}{' '}[Visitar producto]
                  </a>
                }
                description={
                  <>
                    <Typography.Paragraph>
                      Precio Actual: {formatter.format(item.product.price)}
                      <br />
                      Precio deseado: {formatter.format(item.desiredPrice)}
                    </Typography.Paragraph>
                    <Tag color="blue">{item.product.store}</Tag>
                  </>
                }
                avatar={
                  <Avatar
                    shape="square"
                    size="large"
                    src={src}
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
