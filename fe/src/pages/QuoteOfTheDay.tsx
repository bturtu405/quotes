import axios from "axios";
import { useState } from "react";
import { Quote } from "../components/Quote";
import type { quote } from "../types/quote";
import { Navigator } from "../components/Navigator";
import { ActiveFilter } from "../components/ActiveFilter";
import { QuotesForm } from "../components/QuotesForm";

type QuoteResponse = {
  quotes: quote[];
  page: number;
  hasMore: boolean;
}

export const QuoteOfTheDay = () => {
  const [count, setCount] = useState(1);
  const [tag, setTag] = useState("");
  const [quotes, setQuotes] = useState<quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchQuotes = async (page: number, newSearch: boolean, removeActiveTag = false) => {
    setLoading(true);
    setError("");

    if (newSearch) {
      setCurrentPage(0);
      setActiveTag(removeActiveTag ? "" : tag);
      page = 1;
    }

    try {
      const response = await axios.get<QuoteResponse>("/quotes", {
        params: {
          ...(removeActiveTag ? {} : { tag }),
          page,
          count,
        },
      });

      setCurrentPage(response.data.page);
      setHasMore(response.data.hasMore);
      setQuotes(response.data.quotes);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("Failed to fetch quotes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuotes(1, true);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchQuotes(currentPage - 1, false);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      fetchQuotes(currentPage + 1, false);
    }
  };

  return (
    <div className="container">
      <h1>Quotes of the Day</h1>

      <QuotesForm handleSubmit={handleSubmit} count={count} setCount={setCount} tag={tag} setTag={setTag} loading={loading} />

      {error && <div className="error">{error}</div>}

      {activeTag && (
        <ActiveFilter activeTag={activeTag} setTag={setTag} fetchQuotes={fetchQuotes} />
      )}

      <div className="quotes-container">
        {quotes.length > 0
          ? quotes.map((quote, index) => (
              <Quote key={index} quote={quote} index={index} />
            ))
          : !loading && (
              <div className="no-quotes">
                No quotes found. Try searching with a different tag.
              </div>
            )}
      </div>

      {(currentPage > 1 || hasMore) && (
        <Navigator
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          loading={loading}
          currentPage={currentPage}
          hasMore={hasMore}
          quotes={quotes}
        />
      )}
    </div>
  );
};
