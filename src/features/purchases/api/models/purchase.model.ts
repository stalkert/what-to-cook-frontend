import { Good } from '../../../goods/api/models/good.model';

export interface PurchaseGoodItem {
  good: Good;
  checked: boolean;
}

export interface Purchase {
  goods: PurchaseGoodItem[];
  user: string;
}
