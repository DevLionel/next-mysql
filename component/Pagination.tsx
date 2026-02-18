import React from "react";

interface PaginationProps {
  usersCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  usersCount,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(usersCount / pageSize);

  if (totalPages === 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <a
              href="#"
              className="page-link"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
