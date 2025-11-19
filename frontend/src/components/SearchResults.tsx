import React from "react";
import { SearchResponse, Faq } from "../types";

const SearchResultItem: React.FC<{ result: Faq }> = ({ result }) => {
  const snippet =
    result.body.length > 50
      ? result.body.substring(0, 50) + "..."
      : result.body;
  return (
    <li className="search-result-item">
      <h3>{result.title}</h3>
      <p>{snippet}</p>
    </li>
  );
};

const LoadingState = () => (
  <div className="centered">
    <p>Loading results...</p>
  </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
  <div className="centered">
    <p className="error-message">{error}</p>
  </div>
);

const NoResults = () => (
  <div className="centered">
    <p>No results found.</p>
  </div>
);

interface SearchResultsProps {
  isLoading: boolean;
  error: string | null;
  searchResponse: SearchResponse;
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  isLoading,
  error,
  searchResponse,
  searchQuery,
}) => {
  const { data: searchResults, summary } = searchResponse;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (searchResults.length === 0) {
    return <NoResults />;
  }

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="search-results-container">
      {summary && <p className="search-summary">{summary}</p>}
      <ul className="search-results-list">
        {searchResults.map((result) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
