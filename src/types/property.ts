
import { Rating } from "@/types/Rating";

// --- HOST ---
export interface PropertyHost {
  id: string;
  name: string;
  picture?: string;
  role: string;
}

// --- BASE ---
export interface PropertyBase {
  id: string;
  slug: string;
  title: string;
  description?: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: PropertyHost;
}

// --- DETAIL ---
export interface PropertyDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: PropertyHost;

  pictures: string[];
  equipments: string[];
  tags: string[];
  ratings?: Rating[];
}

// --- CREATE ---
export interface PropertyCreate {
  id?: string;
  title: string;
  description?: string;
  cover?: string;
  location: string;
  price_per_night: number;
  host_id: string;
  host?: PropertyHost;
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
}

// --- UPDATE ---
export interface PropertyUpdate {
  title?: string;
  description?: string;
  cover?: string;
  location?: string;
  host_id?: string;
  price_per_night?: number;
}
