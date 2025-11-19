import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { SearchResponse } from "./types";

const defaultSearchResponse: SearchResponse = {
  data: [],
  sources: [],
  summary: "",
};
function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResponse, setSearchResponse] = useState<SearchResponse>(
    defaultSearchResponse
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(searchQuery);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setSearchResponse(defaultSearchResponse);
      return;
    }

    setError(null);
    setIsLoading(true);
    setSearchResponse(defaultSearchResponse);

    try {
      const response = await fetch(`/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setSearchResponse(data);
    } catch (e: any) {
      setError("Failed to fetch search results. Please try again.");
      console.error("Search API error:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar
          searchQuery={query}
          setSearchQuery={setQuery}
          handleSearch={onSearch}
          isLoading={isLoading}
        />
        <SearchResults
          isLoading={isLoading}
          error={error}
          searchResponse={searchResponse}
          searchQuery={searchQuery}
        />
      </header>
    </div>
  );
}

export default App;
