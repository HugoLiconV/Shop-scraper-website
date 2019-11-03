// import React from "react";
// import { useAsync } from "react-async";
// // import { index } from "../services/news-client";
// import CardContainer from "../components/CardContainer";
// import { Skeleton, Typography, Icon, Tag } from "antd";
// import dayjs from "dayjs";

// const AnnouncementDetail = ({ id }) => {
//   // const { data, error, isPending, isRejected } = useAsync({
//   //   promiseFn: index,
//   //   id
//   // });
//   // const tags = (data && data.tags) || [];

//   // return (
//   //   <CardContainer>
//   //     <Skeleton loading={isPending} active>
//   //       {data && data.image && (
//   //         <div
//   //           style={{
//   //             display: "flex",
//   //             justifyContent: "center",
//   //             width: "100%",
//   //             height: 400
//   //           }}
//   //         >
//   //           <img
//   //             alt="Imagen de noticia"
//   //             style={{
//   //               height: "100%",
//   //               objectFit: "cover"
//   //             }}
//   //             src={data.image}
//   //           />
//   //         </div>
//   //       )}
//   //       <Typography.Title level={2}>{data && data.title}</Typography.Title>
//   //       <div style={{ marginBottom: 16 }}>
//   //         <Typography.Text type="secondary">
//   //           <Icon type="clock-circle" style={{ marginRight: 8 }} />
//   //           {dayjs(data && data.createdAt).format("D MMMM YYYY hh:mm a")}
//   //         </Typography.Text>
//   //       </div>
//   //       <span>
//   //         {tags.length > 0 ? (
//   //           tags.map(tag => {
//   //             let color = tag.length > 5 ? "geekblue" : "green";
//   //             return (
//   //               <Tag color={color} key={tag}>
//   //                 {tag.toUpperCase()}
//   //               </Tag>
//   //             );
//   //           })
//   //         ) : (
//   //           <Tag color="green">GENERAL</Tag>
//   //         )}
//   //       </span>
//   //       <Typography.Paragraph style={{ marginTop: 16 }}>
//   //         {`${data && data.content.replace('/\n', '\n')}`}
//   //       </Typography.Paragraph>
//   //     </Skeleton>
//   //   </CardContainer>
//   );
// };

// export default AnnouncementDetail;
