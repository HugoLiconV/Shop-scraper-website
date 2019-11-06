import React from 'react';
import { List, Icon, Skeleton, Typography, Avatar } from 'antd';
import { formatter } from '../utils/priceFormatter';

const PurchasedProductsList = ({
  loading,
  list,
  pagination,
  onPaginationChange
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
        const difference = item.initialPrice - item.purchasedAt;
        console.log("TCL: item", item.title)
        console.log("TCL: item.purchasedAt", item.purchasedAt)
        console.log("TCL: item.initialPrice", item.initialPrice)
        console.log("TCL: difference", difference)
        const negativeIcon = (
          <Icon type="caret-down" style={{ color: "#eb2f96" }} />
        );
        const positiveIcon = (
          <Icon type="caret-up" style={{ color: "#52c41a" }} />
        );
        return (
          <List.Item
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
                      Precio de compra: {formatter.format(item.purchasedAt)}
                      <br />
                      Precio inicial: {formatter.format(item.initialPrice)}
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