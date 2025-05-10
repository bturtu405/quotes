
type QuotesFormProps = {
    handleSubmit: (e: React.FormEvent) => void;
    count: number;
    setCount: (count: number) => void;
    tag: string;
    setTag: (tag: string) => void;
    loading: boolean;
}

export const QuotesForm = ({handleSubmit, count, setCount, tag, setTag, loading}: QuotesFormProps) => {
    return (
        <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="count">Number of quotes:</label>
          <input
            type="number"
            id="count"
            min={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="tag">Filter by tag (optional):</label>
          <input
            type="text"
            id="tag"
            placeholder="e.g. life, love, wisdom"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="tag-input"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Quotes"}
        </button>
      </form>
    )
}