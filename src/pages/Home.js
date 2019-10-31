import React from "react";
import { Layout, Menu, Icon, Typography, Tooltip } from "antd";
import Header from "../components/Header";
import { Router, Link, Match } from "@reach/router";
import CardContainer from "../components/CardContainer";
import { Table, Divider, Tag } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAsync } from "react-async";
import { getNews } from "../services/news-client";
import { navigate } from "@reach/router";

dayjs.extend(relativeTime);

const { Footer, Content } = Layout;

const columns = [
  {
    title: "Título",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <a onClick={() => navigate(`/announcements/${record.id}`)}>{text}</a>
    )
  },
  {
    title: "Publicación",
    dataIndex: "createdAt",
    key: "createdAt",
    render: date => (
      <Tooltip title={dayjs(date).format("D MMMM YYYY hh:mm a")}>
        <span>{dayjs(dayjs(date)).from()}</span>
      </Tooltip>
    )
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.length > 0 ? (
          tags.map(tag => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })
        ) : (
          <Tag color="green">GENERAL</Tag>
        )}
      </span>
    )
  },
  {
    title: "Acción",
    key: "action",
    render: (_, record) => (
      <span>
        <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
        <Divider type="vertical" />
        <Icon type="edit" theme="twoTone" />
      </span>
    )
  }
];

const Home = ({ user }) => {
  const pagination = {
    limit: 5,
    page: 1
  };
  const { data, error, isPending, isRejected, run } = useAsync({
    promiseFn: getNews,
    deferFn: getNews,
    ...pagination
  });


  if (isRejected) {
    return <p>{error}</p>;
  }

  function onPaginationChange(page) {
    run({ ...pagination, page });
  }
  return (
    <CardContainer>
      <Typography.Title level={2}>Noticias publicadas</Typography.Title>
      <Table
        rowKey={({ id }) => id}
        columns={columns}
        dataSource={data && data.rows}
        loading={isPending}
        pagination={{
          position: "bottom",
          total: data && data.count,
          pageSize: pagination.limit,
          onChange: onPaginationChange
        }}
      />
    </CardContainer>
  );
};

export default Home;
