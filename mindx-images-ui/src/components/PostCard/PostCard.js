import React from 'react'
import { Link } from 'react-router-dom';
export default function PostCard({
  imageUrl,
  title,
  description,
  createdBy,
  postId,
}) {
  return (
    <div className="card">
      <Link to={`/posts/${postId}`}>
        <img className="card-img-top" src={imageUrl} alt={title} />
      </Link>
      <div className="card-body">
        <div className="card-title h5">{title}</div>
        <p className="card-text">{description}</p>
        <p className="text-muted card-text">{createdBy}</p>
      </div>
    </div>
  )
}
