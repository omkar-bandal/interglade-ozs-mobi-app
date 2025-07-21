export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  public: {
    Tables: {
      address: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          city: string;
          address_title: string;
        };
        Insert: {
          id: string;
          created_at: string;
          profile_id: string;
          city: string;
          address_title: string;
        };
        Update: {
          id: string;
          created_at: string;
          profile_id: string;
          city: string;
          address_title: string;
        };
        Relationships: [];
      };
      announcement_types: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      app_assets: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          url?: string;
        };
        Relationships: [];
      };
      categories_services: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          type_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          type_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          type_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_services_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'announcement_types';
            referencedColumns: ['id'];
          },
        ];
      };
      categories_ventes: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          type_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          type_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          type_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'announcement_categories_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'announcement_types';
            referencedColumns: ['id'];
          },
        ];
      };
      conversation_participants: {
        Row: {
          conversation_id: string;
          profiles_id: string;
          participant_id: string;
        };
        Insert: {
          conversation_id: string;
          profiles_id: string;
          participant_id: string;
        };
        Update: {
          conversation_id?: string;
          profiles_id?: string;
          participant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'conversation_participants_conversation_id_fkey';
            columns: ['conversation_id'];
            isOneToOne: false;
            referencedRelation: 'conversations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversation_participants_profiles_id_fkey';
            columns: ['profiles_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversation_participants_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      conversations: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      locations: {
        Row: {
          country_code: string | null;
          created_at: string;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string;
          place_id: string;
        };
        Insert: {
          country_code?: string | null;
          created_at?: string;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          place_id: string;
        };
        Update: {
          country_code?: string | null;
          created_at?: string;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          place_id?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          content: string;
          conversation_id: string;
          created_at: string;
          id: string;
          read: boolean;
          sender_id: string;
        };
        Insert: {
          content: string;
          conversation_id: string;
          created_at?: string;
          id?: string;
          read?: boolean;
          sender_id: string;
        };
        Update: {
          content?: string;
          conversation_id?: string;
          created_at?: string;
          id?: string;
          read?: boolean;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_conversation_id_fkey';
            columns: ['conversation_id'];
            isOneToOne: false;
            referencedRelation: 'conversations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_sender_id_fkey';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string | null;
          description: string | null;
          id: string;
          payment_date: string | null;
          payment_method: string | null;
          reservation_id: string | null;
          status: string;
          subscription_id: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string | null;
          description?: string | null;
          id?: string;
          payment_date?: string | null;
          payment_method?: string | null;
          reservation_id?: string | null;
          status: string;
          subscription_id?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string | null;
          description?: string | null;
          id?: string;
          payment_date?: string | null;
          payment_method?: string | null;
          reservation_id?: string | null;
          status?: string;
          subscription_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_reservation_id_fkey';
            columns: ['reservation_id'];
            isOneToOne: false;
            referencedRelation: 'reservations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payments_subscription_id_fkey';
            columns: ['subscription_id'];
            isOneToOne: false;
            referencedRelation: 'subscriptions';
            referencedColumns: ['id'];
          },
        ];
      };
      predefined_items: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          subcategory_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          subcategory_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          subcategory_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'predefined_items_subcategory_id_fkey';
            columns: ['subcategory_id'];
            isOneToOne: false;
            referencedRelation: 'subcategories_ventes';
            referencedColumns: ['id'];
          },
        ];
      };
      predefined_services: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          subcategory_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          subcategory_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          subcategory_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'predefined_services_subcategory_id_fkey';
            columns: ['subcategory_id'];
            isOneToOne: false;
            referencedRelation: 'subcategories_services';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone: string | null;
          profile_picture_url: string | null;
          rating: number | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          profile_picture_url?: string | null;
          rating?: number | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          profile_picture_url?: string | null;
          rating?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      reservations_services: {
        Row: {
          address: string | null;
          client_id: string;
          created_at: string;
          date: string;
          date_time_end: string | null;
          id: string;
          instructions: string | null;
          service_id: string;
          status: string;
          time_slot: string;
          total_amount: number;
          updated_at: string;
          viewed: boolean | null;
        };
        Insert: {
          address?: string | null;
          client_id: string;
          created_at?: string;
          date: string;
          date_time_end?: string | null;
          id?: string;
          instructions?: string | null;
          service_id: string;
          status: string;
          time_slot: string;
          total_amount: number;
          updated_at?: string;
          viewed?: boolean | null;
        };
        Update: {
          address?: string | null;
          client_id?: string;
          created_at?: string;
          date?: string;
          date_time_end?: string | null;
          id?: string;
          instructions?: string | null;
          service_id?: string;
          status?: string;
          time_slot?: string;
          total_amount?: number;
          updated_at?: string;
          viewed?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reservations_services_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_service_id_fkey';
            columns: ['service_id'];
            isOneToOne: false;
            referencedRelation: 'services';
            referencedColumns: ['id'];
          },
        ];
      };
      reviews: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          rating: number;
          reservation_id: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          rating: number;
          reservation_id: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          rating?: number;
          reservation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_reservation_id_fkey';
            columns: ['reservation_id'];
            isOneToOne: false;
            referencedRelation: 'reservations';
            referencedColumns: ['id'];
          },
        ];
      };
      sales: {
        Row: {
          category_id: number;
          condition: string;
          created_at: string;
          description: string;
          id: string;
          items: string[];
          location: string;
          photos: string[];
          price: number;
          seller_id: string;
          subcategory_id: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          category_id: number;
          condition: string;
          created_at?: string;
          description: string;
          id?: string;
          items?: string[];
          location: string;
          photos?: string[];
          price: number;
          seller_id: string;
          subcategory_id: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          category_id?: number;
          condition?: string;
          created_at?: string;
          description?: string;
          id?: string;
          items?: string[];
          location?: string;
          photos?: string[];
          price?: number;
          seller_id?: string;
          subcategory_id?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sales_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_ventes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sales_seller_id_fkey';
            columns: ['seller_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sales_subcategory_id_fkey';
            columns: ['subcategory_id'];
            isOneToOne: false;
            referencedRelation: 'subcategories_ventes';
            referencedColumns: ['id'];
          },
        ];
      };
      secrets: {
        Row: {
          created_at: string;
          key: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          key: string;
          value: string;
        };
        Update: {
          created_at?: string;
          key?: string;
          value?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          availability: string[];
          category_id: number;
          created_at: string;
          description: string;
          id: string;
          location: string;
          photos: string[];
          price: number;
          provider_id: string;
          subcategory_id: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          availability: string[];
          category_id: number;
          created_at?: string;
          description: string;
          id?: string;
          location: string;
          photos: string[];
          price: number;
          provider_id: string;
          subcategory_id: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          availability?: string[];
          category_id?: number;
          created_at?: string;
          description?: string;
          id?: string;
          location?: string;
          photos?: string[];
          price?: number;
          provider_id?: string;
          subcategory_id?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'services_category_id_fkey_new';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_services';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'services_provider_id_fkey';
            columns: ['provider_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'services_subcategory_id_fkey';
            columns: ['subcategory_id'];
            isOneToOne: false;
            referencedRelation: 'subcategories_services';
            referencedColumns: ['id'];
          },
        ];
      };
      subcategories_services: {
        Row: {
          category_id: number;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          category_id: number;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          category_id?: number;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subcategories_category_id_fkey_new';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_services';
            referencedColumns: ['id'];
          },
        ];
      };
      subcategories_ventes: {
        Row: {
          category_id: number;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          category_id: number;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          category_id?: number;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subcategories_ventes_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_ventes';
            referencedColumns: ['id'];
          },
        ];
      };
      subscriptions: {
        Row: {
          amount: number;
          created_at: string;
          end_date: string;
          id: string;
          plan_type: string;
          start_date: string;
          status: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          end_date: string;
          id?: string;
          plan_type: string;
          start_date: string;
          status: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          end_date?: string;
          id?: string;
          plan_type?: string;
          start_date?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      reservation_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | {schema: keyof Database},
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {schema: keyof Database}
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
