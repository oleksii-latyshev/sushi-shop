import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onChangePage }) => (
  <ReactPaginate
    className={styles.pagination}
    breakLabel='...'
    nextLabel='>'
    previousLabel='<'
    forcePage={currentPage - 1}
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={totalPages}
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
