
export interface SingleProduct {  // Api Create a Product
    product: Product;
}

export interface AllProds {  // Api Get All Prods
    total:    number;
    products: Product[];
}

export interface Product {
    name:      string;
    price:     string;
    category:  Category;
    desc?: string;
    available?: boolean;
    amount?:    number;
    id:        string;
    img1?: string;
    img2?: string;
    img3?: string;
}

export interface Category {
    _id:  string;
    name: string;
}

// Search
export interface Search {
    results: Result[];
}

export interface Result {
    name:      string;
    price:     string;
    category:  Category;
    available: boolean;
    amount:    number;
    img1?:      string;
    img2?:      string;
    img3?:      string;
    id:        string;
}




