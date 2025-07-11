export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      semesters: {
        Row: {
          id: number
          user_id: string
          name: string
          start_date: string
          end_date: string
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          start_date: string
          end_date: string
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          start_date?: string
          end_date?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "semesters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          id: number
          user_id: string
          semester_id: number
          name: string
          professor: string | null
          credits: number
          color: string
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          semester_id: number
          name: string
          professor?: string | null
          credits?: number
          color?: string
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          semester_id?: number
          name?: string
          professor?: string | null
          credits?: number
          color?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subjects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subjects_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          }
        ]
      }
      grading_items: {
        Row: {
          id: number
          user_id: string
          subject_id: number
          name: string
          weight: number
          max_grade: number
          grade_obtained: number | null
          due_date: string | null
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          subject_id: number
          name: string
          weight?: number
          max_grade?: number
          grade_obtained?: number | null
          due_date?: string | null
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          subject_id?: number
          name?: string
          weight?: number
          max_grade?: number
          grade_obtained?: number | null
          due_date?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grading_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grading_items_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
      assignments: {
        Row: {
          id: number
          subject_id: number
          user_id: string
          name: string
          description: string | null
          type: string
          max_grade: number
          weight: number
          due_date: string | null
          grade_obtained: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          subject_id: number
          user_id: string
          name: string
          description?: string | null
          type: string
          max_grade?: number
          weight?: number
          due_date?: string | null
          grade_obtained?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          subject_id?: number
          user_id?: string
          name?: string
          description?: string | null
          type?: string
          max_grade?: number
          weight?: number
          due_date?: string | null
          grade_obtained?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
