export interface PartItem {
  id: number;
  name: string;
  description: string;
  carModel: string;
  carMark: string;
  amount: number;
  price: number;
}

export interface AmountUpdatePayload {
  id: number;
  amount: number;
}

export interface PartsSearch {
  name: string;
  carModel: string;
  carMark: string;
}
