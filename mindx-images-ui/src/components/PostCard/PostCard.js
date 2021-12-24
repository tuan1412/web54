import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import "./style.css";

const { Meta } = Card;

export default function PostCard({
  imageUrl,
  title,
  description,
  createdBy,
  postId,
}) {
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <Link to={`/posts/${postId}`}>
          <img alt={title} src={imageUrl} />
        </Link>
      }
    >
      <Meta title={title} description={description} />
      <div>{createdBy}</div>
    </Card>
  );
}
