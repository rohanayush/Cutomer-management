export interface actionStruc{
    edit: boolean;
    delete: boolean;
}


export interface Customer {
    id: number;
    name: string;
    product: string;
    purchaseDate: string; // Storing dates as strings
    purchaseAmount: number;
    actions:actionStruc;
  }
  