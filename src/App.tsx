import { useState, useEffect } from 'react'
import Calendar from './components/Calender'
import { ProblemForm } from './components/ProblemForm'
import { ProblemList } from './components/ProblemList'
import { problemsService } from './services/problems'
import type { Problem, NewProblem } from './types/database.types'
import { fetchStreakData, addStreakDate } from './lib/supabase'
import './App.css'

function App() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [streakDates, setStreakDates] = useState<Date[]>([]);

  console.log(streakDates)

  useEffect(() => {
    loadProblems();
    const loadStreakData = async () => {
      const data = await fetchStreakData();
      if (data) {
        setStreakDates(data.map((entry: { date: string }) => new Date(entry.date)));
      }
    };
    loadStreakData();
  }, []);

  const loadProblems = async () => {
    try {
      const data = await problemsService.getProblems();
      setProblems(data);
    } catch (err) {
      setError('Failed to load problems');
      console.error(err);
    }
  };

  const handleAddProblem = async (problemData: Omit<NewProblem, 'date_completed'>) => {
    try {
      const newProblem = await problemsService.addProblem({
        ...problemData,
        date_completed: new Date().toISOString(),
      });
      setProblems(prev => [newProblem, ...prev]);

      await addStreakDate(new Date());
      setStreakDates(prev => [...prev, new Date()]);
    } catch (err) {
      setError('Failed to add problem');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            LeetCode Daily Tracker
          </h1>
        </div>
      </header>
      <Calendar streakDates={streakDates} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/20 backdrop-blur-md shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Problem</h2>
              <ProblemForm onSubmit={handleAddProblem} />
            </div>
            <div className="bg-white/20 backdrop-blur-md shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Problems</h2>
              <ProblemList problems={problems} />
            </div>
          </div>
        </div>
      </main>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}

export default App
