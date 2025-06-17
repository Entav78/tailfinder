/**
 * @component Pagination
 * Renders pagination buttons for navigating through multiple pages.
 *
 * Behavior:
 * - If there is only one page or less, nothing is rendered.
 * - Displays a button for each page.
 * - Highlights the currently active page.
 * - Calls `onPageChange` with the new page number when a button is clicked.
 *
 * @param {Object} props - Component props
 * @param {number} props.totalPages - Total number of pages available
 * @param {number} props.currentPage - The currently active page
 * @param {(page: number) => void} props.onPageChange - Callback triggered when a page button is clicked
 *
 * @returns {JSX.Element | null} Pagination buttons or `null` if only one page
 */

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
              ? 'bg-header text-text-button-light font-bold'
              : 'bg-secondary text-text-dark hover:bg-secondary-hover'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
