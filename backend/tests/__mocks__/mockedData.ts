import { TableColumn } from "../integration/dbUtils";

export interface Stock {
  id: number;
  label: string;
  description: string;
  quantity: number;
}

export const fakeStocks: Stock[] = [
  { id: 1, label: "Stock1", description: "Description1", quantity: 10 },
  { id: 2, label: "Stock2", description: "Description2", quantity: 20 },
  { id: 3, label: "Stock3", description: "Description3", quantity: 30},
];

export const fakeStocksWithoutId = [
  { id: undefined, label: "Stock1" },
  { id: undefined, label: "Stock2" },
];

export const expectedTableStructure: TableColumn[] = [
  { column_name: "id", data_type: "int" },
  { column_name: "label", data_type: "varchar" },
];

export const newStocks: Stock[] = [{ id: 4, label: "MyNewStock", description: "MyNewDescription", quantity: 40}];
