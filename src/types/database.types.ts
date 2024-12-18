export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  date_completed?: string;
  notes?: string;
  user_id: string;
  created_at: string;
}

export type NewProblem = Omit<Problem, 'id' | 'created_at' | 'user_id'>; 