import React from 'react';
import { FilterType } from '../types/task';
import { Search, List, CheckCircle, Circle } from 'lucide-react';

interface TaskFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export function TaskFilters({ filter, onFilterChange, searchTerm, onSearchChange, stats }: TaskFiltersProps) {
  const filters = [
    { key: 'all' as const, label: 'All Tasks', icon: List, count: stats.total },
    { key: 'active' as const, label: 'Active', icon: Circle, count: stats.active },
    { key: 'completed' as const, label: 'Completed', icon: CheckCircle, count: stats.completed },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filters.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`p-4 rounded-xl text-center transition-all duration-200 ${
              filter === key
                ? 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg'
                : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15'
            }`}
          >
            <Icon className="w-6 h-6 mx-auto mb-2 text-white" />
            <div className="text-white font-medium text-sm">{label}</div>
            <div className="text-white/80 text-lg font-bold">{count}</div>
          </button>
        ))}
      </div>
    </div>
  );
}