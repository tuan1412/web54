import React from 'react'
import { Pagination as AntdPagination } from 'antd';

import './style.css';

export default function Pagination({ 
  currentPage, 
  total,
  handleChangePage,
  pageSize = 4 
}) {
  return (
    <AntdPagination 
      current={currentPage} 
      total={total} 
      pageSize={pageSize}
      onChange={page => handleChangePage(page)}
    />
  )
}
