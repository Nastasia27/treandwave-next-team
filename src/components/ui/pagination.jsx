'use client'
import ReactPaginate from "react-paginate";

export const PaginationOutline = ({ totalGoods, onPaginationClick }) => {
  return (
    <div className="flex justify-center my-7">
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPaginationClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(totalGoods / 10)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}