import React from 'react';

interface JobFilterBarProps {
  filters: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
}

export function JobFilterBar({ filters, onChange }: JobFilterBarProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    onChange({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex gap-4 items-center my-2">
      <select name="type" value={filters.type || ''} onChange={handleChange} className="select select-bordered">
        <option value="">All Types</option>
        <option value="REMOTE">Remote</option>
        <option value="HYBRID">Hybrid</option>
        <option value="ONSITE">Onsite</option>
      </select>
      <select name="experienceLevel" value={filters.experienceLevel || ''} onChange={handleChange} className="select select-bordered">
        <option value="">All Levels</option>
        <option value="JUNIOR">Junior</option>
        <option value="MID">Mid</option>
        <option value="SENIOR">Senior</option>
        <option value="LEAD">Lead</option>
      </select>
      <input
        type="text"
        name="location"
        value={filters.location || ''}
        onChange={handleChange}
        placeholder="Location"
        className="input input-bordered"
      />
    </div>
  );
}
