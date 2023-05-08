function Pagination(props) {
  const { onPageChange, pagination } = props;
  const { _page, _limit, totalRows } = pagination;
  const lastPage = Math.ceil(totalRows / _limit);
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };
  return (
    <div className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={_page <= 1}
          onClick={() => {
            handlePageChange(_page - 1);
          }}
          className="relative inline-flex items-center rounded-md border disabled:bg-primary/30 border-gray-300 bg-primary/80 px-4 py-2 text-sm font-medium text-white hover:bg-primary"
        >
          Trang trước
        </button>
        <button
          disabled={_page === lastPage}
          onClick={() => {
            handlePageChange(_page + 1);
          }}
          className="relative ml-3 inline-flex items-center rounded-md border disabled:bg-primary/30 border-gray-300 bg-primary/80 px-4 py-2 text-sm font-medium text-white hover:bg-primary"
        >
          Trang sau
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {/* <p className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{totalRows >= 6 ? _limit : totalRows}</span> đến{" "}
            <span className="font-medium">{totalRows}</span> trong tổng số{" "}
            <span className="font-medium">{totalRows}</span> tất cả kết quả
          </p> */}
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              disabled={_page <= 1}
              onClick={() => {
                handlePageChange(_page - 1);
              }}
              className="relative duration-300 inline-flex items-center disabled:bg-primary/30 rounded-l-md border border-gray-300 bg-primary/80 px-2 py-2 text-sm font-medium text-white hover:bg-primary focus:z-20"
            >
              <span className="sr-only">Trang trước</span>
              <box-icon name="chevron-left" type="solid" color="white"></box-icon>
            </button>
            <button
              disabled={_page === lastPage}
              onClick={() => {
                handlePageChange(_page + 1);
              }}
              className="relative duration-300 inline-flex items-center rounded-r-md border disabled:bg-primary/30 border-gray-300 bg-primary/80 px-2 py-2 text-sm font-medium text-white hover:bg-primary focus:z-20"
            >
              <span className="sr-only">Trang sau</span>
              <box-icon type="solid" name="chevron-right" color="white"></box-icon>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
