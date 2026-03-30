import { UserPublic } from "@/types/user";

/**
 * Un avis complet renvoyé par l'API
 */
export interface Rating {
  id: string;
  score: number;
  comment?: string;
  created_at: string;
  user: UserPublic;
}

/**
 * Payload pour créer un avis
 */
export interface RatingCreate {
  user_id: string;
  score: number;
  comment?: string;
}

/**
 * Résumé des avis d'un logement
 */
export interface RatingsSummary {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
}
