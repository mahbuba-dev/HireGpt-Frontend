import React, { useState } from 'react';
import { JobList } from '@/components/modules/Job/JobList';
import { JobDetail } from '@/components/modules/Job/JobDetail';
import { JobSearchBar } from '@/components/modules/Job/JobSearchBar';
import { JobFilterBar } from '@/components/modules/Job/JobFilterBar';

export default function JobsPage() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [search, setSearch] = useState('');

  function handleSearch(query: string) {
    setSearch(query);
  }

  function handleFilterChange(newFilters: Record<string, any>) {
    setFilters(newFilters);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <JobSearchBar onSearch={handleSearch} />
        <JobFilterBar filters={filters} onChange={handleFilterChange} />
        <JobList
          params={{ ...filters, search }}
          onSelectJob={job => setSelectedJobId(job.id)}
        />
      </div>
      <div className="md:col-span-2">
        {selectedJobId ? (
          <JobDetail jobId={selectedJobId} />
        ) : (
          <div className="text-gray-400 text-center mt-20">Select a job to view details</div>
        )}
      </div>
    </div>
  );
}
