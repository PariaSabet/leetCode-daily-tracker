import type { Problem } from '../types/database.types';

interface ProblemListProps {
  problems: Problem[];
}

export function ProblemList({ problems }: ProblemListProps) {
  const getDifficultyColor = (difficulty: Problem['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
    }
  };

  if (problems.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No problems solved yet. Start adding some!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <div
          key={problem.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{problem.title}</h3>
              <p className="text-sm text-gray-500">{problem.category}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
          </div>
          {problem.notes && (
            <p className="text-sm text-gray-600 mt-2">{problem.notes}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Completed: {problem.date_completed ? new Date(problem.date_completed).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      ))}
    </div>
  );
} 