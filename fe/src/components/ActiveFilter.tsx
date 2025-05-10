
type ActiveFilterProps = {
    activeTag: string;
    setTag: (tag: string) => void;
    fetchQuotes: (page: number, newSearch: boolean, removeActiveTag: boolean) => void;
}


export const ActiveFilter = ({activeTag, setTag, fetchQuotes}: ActiveFilterProps) => {
    return (
        <div className="active-filter">
          <span>Filtering by tag: </span>
          <span className="tag-badge">{activeTag}</span>
          <button
            className="clear-filter"
            onClick={() => {
              setTag("");
              fetchQuotes(1, true, true);
            }}
          >
            ✕
          </button>
        </div>
    )
}