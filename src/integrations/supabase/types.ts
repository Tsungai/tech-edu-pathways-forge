export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      capstones: {
        Row: {
          created_at: string
          description: string
          due_date: string | null
          id: string
          instructions: string | null
          requirements: string | null
          title: string
          updated_at: string
          week_id: string
        }
        Insert: {
          created_at?: string
          description: string
          due_date?: string | null
          id?: string
          instructions?: string | null
          requirements?: string | null
          title: string
          updated_at?: string
          week_id: string
        }
        Update: {
          created_at?: string
          description?: string
          due_date?: string | null
          id?: string
          instructions?: string | null
          requirements?: string | null
          title?: string
          updated_at?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "capstones_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: true
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          activated_at: string | null
          completed_at: string | null
          current_week: number | null
          enrolled_at: string
          enrollment_id: string
          id: string
          program_id: string
          status: string
          student_id: string
        }
        Insert: {
          activated_at?: string | null
          completed_at?: string | null
          current_week?: number | null
          enrolled_at?: string
          enrollment_id: string
          id?: string
          program_id: string
          status?: string
          student_id: string
        }
        Update: {
          activated_at?: string | null
          completed_at?: string | null
          current_week?: number | null
          enrolled_at?: string
          enrollment_id?: string
          id?: string
          program_id?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          feedback: string | null
          graded_at: string
          id: string
          score: number | null
          status: string
          submission_id: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          feedback?: string | null
          graded_at?: string
          id?: string
          score?: number | null
          status?: string
          submission_id: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          feedback?: string | null
          graded_at?: string
          id?: string
          score?: number | null
          status?: string
          submission_id?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "grades_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_login_completed: boolean | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_login_completed?: boolean | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_login_completed?: boolean | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          description: string | null
          duration_weeks: number
          id: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_weeks?: number
          id?: string
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_weeks?: number
          id?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      prospective_users: {
        Row: {
          converted_at: string | null
          converted_to_user_id: string | null
          course_interest: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          phone: string
          status: string
        }
        Insert: {
          converted_at?: string | null
          converted_to_user_id?: string | null
          course_interest: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          phone: string
          status?: string
        }
        Update: {
          converted_at?: string | null
          converted_to_user_id?: string | null
          course_interest?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          phone?: string
          status?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_index: number | null
          title: string
          type: string
          url: string
          week_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number | null
          title: string
          type: string
          url: string
          week_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number | null
          title?: string
          type?: string
          url?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          program_id: string
          updated_at: string
          week_number: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          program_id: string
          updated_at?: string
          week_number?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          program_id?: string
          updated_at?: string
          week_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subjects_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          capstone_id: string | null
          github_url: string
          id: string
          notes: string | null
          student_id: string
          submitted_at: string
          task_id: string | null
        }
        Insert: {
          capstone_id?: string | null
          github_url: string
          id?: string
          notes?: string | null
          student_id: string
          submitted_at?: string
          task_id?: string | null
        }
        Update: {
          capstone_id?: string | null
          github_url?: string
          id?: string
          notes?: string | null
          student_id?: string
          submitted_at?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_capstone_id_fkey"
            columns: ["capstone_id"]
            isOneToOne: false
            referencedRelation: "capstones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          day_number: number
          description: string
          due_date: string | null
          id: string
          instructions: string | null
          title: string
          updated_at: string
          week_id: string
        }
        Insert: {
          created_at?: string
          day_number: number
          description: string
          due_date?: string | null
          id?: string
          instructions?: string | null
          title: string
          updated_at?: string
          week_id: string
        }
        Update: {
          created_at?: string
          day_number?: number
          description?: string
          due_date?: string | null
          id?: string
          instructions?: string | null
          title?: string
          updated_at?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_assignments: {
        Row: {
          assigned_at: string
          id: string
          subject_id: string
          teacher_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          subject_id: string
          teacher_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          subject_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weeks: {
        Row: {
          created_at: string
          id: string
          is_published: boolean | null
          objectives: string | null
          subject_id: string
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_published?: boolean | null
          objectives?: string | null
          subject_id: string
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          id?: string
          is_published?: boolean | null
          objectives?: string | null
          subject_id?: string
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "weeks_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_enrollment_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "teacher" | "admin" | "student_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "teacher", "admin", "student_admin"],
    },
  },
} as const
