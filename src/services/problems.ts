import { supabase } from '../lib/supabase';
import type { Problem, NewProblem } from '../types/database.types';

export const problemsService = {
  async getProblems() {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('date_completed', { ascending: false });

    if (error) throw error;
    return data as Problem[];
  },

  async addProblem(problem: NewProblem) {
    const { data, error } = await supabase
      .from('problems')
      .insert([problem])
      .select()
      .single();

    if (error) throw error;
    return data as Problem;
  },

  async deleteProblem(id: string) {
    const { error } = await supabase
      .from('problems')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 