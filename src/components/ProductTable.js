import React from 'react';
import { Table, Icon, Divider, Popconfirm, Tag } from 'antd';
import { formatter } from '../utils/priceFormatter';

const { Column} = Table
const ProductTable = ({
  pagination,
  list,
  loading,
  onRemove,
  onUpdate,
  onPaginationChange
}) => {
  return (
    <Table
      rowKey={record => record.id}
      dataSource={list}
      pagination={{
        position: "bottom",
        total: pagination.total,
        pageSize: pagination.limit,
        onChange: onPaginationChange
      }}
      loading={loading}
    >
      <Column
        width="5%"
        title="Imagen"
        dataIndex="product.image"
        render={(image, record) => {
          const src = image || require("../assets/img/No-image-found.jpg");
          return <img style={{ width: 64 }} src={src} alt={record.title} />;
        }}
      />
      <Column
        title="Título"
        dataIndex="product.title"
        width="50%"
        sorter={(a, b) =>
          a.product.title < b.product.title
            ? -1
            : a.product.title > b.title
            ? 1
            : 0
        }
        render={(text, record) => (
          <a
            href={record.product.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )}
      />
      <Column
        title="Precio"
        dataIndex="product.price"
        sorter={(a, b) => a.product.price - b.product.price}
        render={text => formatter.format(text)}
      />
      <Column
        title="Precio deseado"
        dataIndex="desiredPrice"
        sorter={(a, b) => a.desiredPrice - b.desiredPrice}
        render={text => formatter.format(text)}
      />
      <Column
        title="Diferencia"
        sorter={(a, b) =>
          a.product.price - a.desiredPrice - (b.product.price - b.desiredPrice)
        }
        render={(text, record) => {
          const difference = record.product.price - record.desiredPrice;
          const negativeIcon = (
            <Icon type="caret-up" style={{ color: "#eb2f96" }} />
          );
          const positiveIcon = (
            <Icon type="caret-down" style={{ color: "#52c41a" }} />
          );
          return (
            <span>
              {formatter.format(difference)}{" "}
              {difference > 0 ? negativeIcon : positiveIcon}
            </span>
          );
        }}
      />
      <Column
        title="Tienda"
        dataIndex="product.store"
        render={store => <Tag color="blue">{store}</Tag>}
      />
      <Column
        title="Action"
        key="action"
        width="10%"
        render={(text, record) => (
          <span>
            <Icon
              type="edit"
              onClick={async () => {
                onUpdate(record);
              }}
              theme="twoTone"
            />
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onRemove(record.trackId)}
            >
              <Icon theme="twoTone" twoToneColor="#eb2f96" type="delete" />
            </Popconfirm>
          </span>
        )}
      />
    </Table>
  );
};

export default ProductTable;