export interface NormalizedProduct {
  externalId: string;
  source: string;
  name: string;
  description: string | null;
  category: string | null;
  image: string | null;
  gallery: string[];
  price: number;
  discount: number | null;
  material: string | null;
  department: string | null;
  createdAt?: Date,
  updatedAt?: Date,
}