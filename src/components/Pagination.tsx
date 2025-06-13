interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ? 'bg-header text-white font-bold'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
