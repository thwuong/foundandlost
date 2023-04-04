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
          className="relative inline-flex items-center rounded-md border disabled:bg-white/40 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={_page === lastPage}
          onClick={() => {
            handlePageChange(_page + 1);
          }}
          className="relative ml-3 inline-flex items-center rounded-md border disabled:bg-white/40 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{1}</span> to{" "}
            <span className="font-medium">{_limit}</span> of{" "}
            <span className="font-medium">{totalRows}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={_page <= 1}
              onClick={() => {
                handlePageChange(_page - 1);
              }}
              className="relative inline-flex items-center disabled:bg-white/40 rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <box-icon
                name="chevron-left"
                type="solid"
                color="gray"
              ></box-icon>
            </button>
            <button
              disabled={_page === lastPage}
              onClick={() => {
                handlePageChange(_page + 1);
              }}
              className="relative inline-flex items-center rounded-r-md border disabled:bg-white/40 border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <box-icon
                type="solid"
                name="chevron-right"
                color="gray"
              ></box-icon>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
