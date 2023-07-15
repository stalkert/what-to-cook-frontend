export type Direction = 'asc' | 'desc';

export interface List<DataType> {
  items: DataType[];
  total: number;
  pageSize: number;
  current: number;
}

export interface ListQueryParams {
  page: number;
  size: number;
  field?: string;
  direction?: Direction;
  search?: string;
}
