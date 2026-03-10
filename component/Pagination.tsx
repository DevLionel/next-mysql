"use client";

import React from "react";

interface PaginationProps {
  usersCount: number; // total number of filtered users
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

  if (totalPages <= 1) return null; // no pagination needed

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            href="#"
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            Previous
          </a>
        </li>

        {/* Page numbers */}
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <a
              href="#"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            href="#"
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;