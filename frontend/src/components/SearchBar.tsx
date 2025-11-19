import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
}) => {
  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
