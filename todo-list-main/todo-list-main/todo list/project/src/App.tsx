import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { TaskFilters } from './components/TaskFilters';
import { ProgressStats } from './components/ProgressStats';

function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    stats,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">TaskFlow</h1>
          </div>
          <p className="text-white/80 text-lg">Organize your tasks and boost your productivity</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TaskFilters
              filter={filter}
              onFilterChange={setFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              stats={stats}
            />
            <ProgressStats stats={stats} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <TaskForm onAddTask={addTask} />

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <CheckSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white/60 text-lg font-medium mb-2">
                    {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                  </h3>
                  <p className="text-white/40">
                    {filter === 'all'
                      ? 'Create your first task to get started!'
                      : `Switch to "All Tasks" to see your complete list.`}
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            Built with React & TypeScript • Persistent local storage
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;