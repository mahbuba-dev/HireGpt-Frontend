import React, { useState } from 'react';

interface JobSearchBarProps {
  onSearch: (query: string) => void;
}

export function JobSearchBar({ onSearch }: JobSearchBarProps) {
  const [query, setQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="input input-bordered flex-1"
      />
      <button type="submit" className="btn btn-secondary">Search</button>
    </form>
  );
}
