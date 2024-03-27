import { TableColumn } from "../integration/dbUtils";

export interface Stock {
  id: number;
  label: string;
}

export const fakeStocks: Stock[] = [
  { id: 1, label: "Stock1" },
  { id: 2, label: "Stock2" },
  { id: 3, label: "Stock3" },
];

export const fakeStocksWithoutId = [
  { id: undefined, label: "Stock1" },
  { id: undefined, label: "Stock2" },
];

export const expectedTableStructure: TableColumn[] = [
  { column_name: "id", data_type: "int" },
  { column_name: "label", data_type: "varchar" },
];

export const newStocks: Stock[] = [{ id: 4, label: "MyNewStock" }];
