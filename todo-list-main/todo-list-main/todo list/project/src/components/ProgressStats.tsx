import React from 'react';
import { TrendingUp, Target, Calendar } from 'lucide-react';

interface ProgressStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export function ProgressStats({ stats }: ProgressStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Progress Overview
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/80">Completion Rate</span>
          <span className="text-white font-bold text-xl">{completionRate}%</span>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-white/80 text-sm">Total Tasks</span>
            </div>
            <div className="text-white font-bold text-2xl">{stats.total}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-white/80 text-sm">Completed</span>
            </div>
            <div className="text-white font-bold text-2xl">{stats.completed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}