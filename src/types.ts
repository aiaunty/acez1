export interface ProductOption {
  id: string;
  label: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  value: string | null;
  options?: ProductOption[];
  isCustom?: boolean;
  isMultiSelect?: boolean;
  placeholder?: string;
}

export interface ProductGroup {
  id: string;
  name: string;
  categories: ProductCategory[];
  imageUrl?: string;
}

export interface ProductProgress {
  category: string;
  value: string;
  completed: boolean;
}

export interface ModelCode {
  category: string;
  code: string;
}

export interface PriceModifier {
  productGroup: string;
  category: string;
  value: string;
  price: number;
}

export interface BasePrice {
  productGroup: string;
  price: number;
}