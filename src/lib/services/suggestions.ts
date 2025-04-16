import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/database.types';

type Suggestion = Database['public']['Tables']['project_suggestions']['Row'];

export async function createSuggestion(data: Omit<Suggestion, 'id' | 'created_at'>) {
  const { data: suggestion, error } = await supabase.from('project_suggestions').insert(data).select().single();

  if (error) {
    throw new Error(`Failed to create suggestion: ${error.message}`);
  }

  return suggestion;
}

export async function getSuggestions() {
  const { data: suggestions, error } = await supabase.from('project_suggestions').select('*').order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch suggestions: ${error.message}`);
  }

  return suggestions;
}

export async function updateSuggestionStatus(id: string, status: Suggestion['status']) {
  const { data: suggestion, error } = await supabase.from('project_suggestions').update({ status }).eq('id', id).select().single();

  if (error) {
    throw new Error(`Failed to update suggestion status: ${error.message}`);
  }

  return suggestion;
}
