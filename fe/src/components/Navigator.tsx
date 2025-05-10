import type { quote } from "../types/quote";



type NavigatorProps = {
    handlePrevious: () => void;
    handleNext: () => void;
    loading: boolean;
    currentPage: number;
    hasMore: boolean;
    quotes: quote[];
}



export const Navigator = ({handlePrevious, handleNext, loading, currentPage, hasMore, quotes}: NavigatorProps) => {
    return (
        <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={loading || currentPage <= 1}
        >
          &larr; Previous
        </button>

        <span className="page-info">Page {currentPage} </span>
        <span className="page-info"> {quotes.length} quotes</span>

        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={loading || !hasMore}
        >
          Next &rarr;
        </button>
      </div>
    )
}