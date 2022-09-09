
export interface RespAllCate {
  total: number;
  categories: Category[];
}

export interface RespAddCate {
  category: Category;
}

export interface Category {
  name: string;
  id: string;
}

// Search 
export interface SearchCategory {
  results: Category[];
}



