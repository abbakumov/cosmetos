export type ProductId = number;

export interface ProductBase {
    id: ProductId;
    brand: string;
    title: string;
    smallPicUrl: string;
}
