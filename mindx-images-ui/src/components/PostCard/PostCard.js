import React from 'react'

export default function PostCard({
  imageUrl,
  title,
  description,
  createdBy
}) {
  return (
    <div className="card">
      <img className="card-img-top" src={imageUrl} alt={title} />
      <div className="card-body">
        <div className="card-title h5">{title}</div>
        <p className="card-text">{description}</p>
        <p className="text-muted card-text">{createdBy}</p>
      </div>
    </div>
  )
}
