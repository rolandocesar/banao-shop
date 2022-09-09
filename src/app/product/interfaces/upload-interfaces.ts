
export interface Upload {
    model: Model;
}

export interface Model {
    name:      string;
    price:     string;
    category:  Category;
    available: boolean;
    amount:    number;
    img1:      string;
    img2?:      string;
    img3?:      string;
    id:        string;
}

export interface Category {
    _id:  string;
    name: string;
}
