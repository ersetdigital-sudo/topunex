export interface Game {
  id: string;
  slug: string;
  name: string;
  icon_url: string;
  is_active: boolean;
  sort_order: number;
  range_label: string;
  icon_width: number;
  icon_height: number;
  user_id_label: string;
  user_id_placeholder: string;
  server_id_label: string;
  server_id_placeholder: string;
  server_id_required: boolean;
  hide_server_id: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pricing {
  id: string;
  game_id: string;
  nominal_label: string;
  price: number;
  category: string;
  badge: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PricingWithGame extends Pricing {
  games: Pick<Game, "name" | "slug"> | null;
}

export interface GameWithPricing extends Game {
  pricing: Pricing[];
}

export interface Setting {
  key: string;
  value: string;
  updated_at: string;
}
