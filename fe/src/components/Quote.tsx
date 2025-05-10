import type { quote } from "../types/quote";

export const Quote = ({ quote, index }: { quote: quote; index: number }) => {
  return (
    <div key={index} className="quote-card">
      <blockquote>"{quote.quote}"</blockquote>
      <cite>— {quote.author}</cite>
      {quote.tags && quote.tags.length > 0 && (
        <div className="tags">
          {quote.tags.map((tag: string) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
