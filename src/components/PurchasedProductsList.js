import React from "react";
import { List, Icon, Skeleton, Typography, Avatar, Tag } from "antd";
import { formatter } from "../utils/priceFormatter";

const PurchasedProductsList = ({ loading, list }) => {
  return (
    <List
      loading={loading}
      pagination={false}
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => {
        const src =
          item.product.image || require("../assets/img/No-image-found.jpg");
        const difference = item.initialPrice - item.purchasedAt;
        const negativeIcon = (
          <Icon type="caret-down" style={{ color: "#eb2f96" }} />
        );
        const positiveIcon = (
          <Icon type="caret-up" style={{ color: "#52c41a" }} />
        );
        return (
          <List.Item>
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
                      Precio de compra: {formatter.format(item.purchasedAt)}
                      <br />
                      Precio inicial: {formatter.format(item.initialPrice)}
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
                Ahorrado: {formatter.format(difference)}{" "}
                {difference < 0 ? negativeIcon : positiveIcon}
              </span>
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );
};

export default PurchasedProductsList;
