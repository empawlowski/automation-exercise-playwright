interface UserType {
  usertype: string;
}

interface Category {
  usertype: UserType;
  category: string;
}

export interface ProductApiModel {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: Category;
}

export interface UpdateBrandListApiModel {
  id: number;
  brand: string;
}
