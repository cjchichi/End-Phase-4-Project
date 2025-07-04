// src/components/PaginationControls.js
/*
import React from 'react';

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const prev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const next = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={next}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
*/

import React from 'react';

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="my-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
