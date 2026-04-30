export const Pagination = ({ pagination, setPagination }) => {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10">
      <nav className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-md border border-gray-200">
        {/* Previous */}
        <button
          disabled={!pagination.hasPrevious}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageNumber: prev.pageNumber - 1,
            }))
          }
          className={`
            px-4 h-10 rounded-xl font-medium transition-all duration-200
            ${
              pagination.hasPrevious
                ? "bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          ←
        </button>

        {/* Pages */}
        <div className="flex items-center gap-2">
          {pages.map((page) => {
            const isActive = pagination.pageNumber === page;

            return (
              <button
                key={page}
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageNumber: page,
                  }))
                }
                className={`
                  w-10 h-10 rounded-xl font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          disabled={!pagination.hasNext}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageNumber: prev.pageNumber + 1,
            }))
          }
          className={`
            px-4 h-10 rounded-xl font-medium transition-all duration-200
            ${
              pagination.hasNext
                ? "bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          →
        </button>
      </nav>
    </div>
  );
};
