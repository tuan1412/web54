import React from 'react'

export default function Pagination({ 
  currentPage, 
  total,
  handleChangePage,
  pageSize = 4 
}) {
  const maxPage = Math.ceil(total / pageSize);

  const renderPageItems = () => {
    const pageItems = [];

    for (let i = 1; i <= maxPage; i+= 1) {
      const isActive = i === currentPage;

      const cls = isActive? "page-item active" : "page-item";
      const pageItem = (
        <li 
          className={cls} 
          onClick={() => {
            if (!isActive) {
              handleChangePage(i);
            }
          }}
        >
          <span className="page-link">{i}</span>
        </li>
      );
      pageItems.push(pageItem)
    };
    
    return pageItems;
  }

  return (
    <ul class="pagination">
      {renderPageItems()}
    </ul>
  )
}
