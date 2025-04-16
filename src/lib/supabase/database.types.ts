export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      project_suggestions: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          user_id: string;
          status: 'pending' | 'approved' | 'rejected';
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          user_id: string;
          status?: 'pending' | 'approved' | 'rejected';
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          user_id?: string;
          status?: 'pending' | 'approved' | 'rejected';
          metadata?: Json | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
