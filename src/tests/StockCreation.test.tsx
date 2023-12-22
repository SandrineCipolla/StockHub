//import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
//import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

import StockCreation from "../pages/home/StockCreation";

describe("HomePage", () => {
  test("The StockCreation component is visible", () => {
    // Dom Virtuel
    render(<StockCreation />);
    // Assertions
    expect(screen.getByText("Add a new stock")).toBeInTheDocument();
  });
});

describe("StockCreation", () => {
  test("The StockCreation component is visible with an 'Add Stock' button", () => {
    //Dom virtuel
    render(<StockCreation />);
    // Assertions
    expect(screen.getByText("Add a new stock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add a new stock" })
    ).toBeInTheDocument();
  });

  test("Clicking 'Add Stock' button triggers a stock addition action", () => {
    const addStockMock = jest.fn(); // simuler la fonction
    //Dom virtuel
    // passer la fonction simulée en props
    render(<StockCreation onAddStock={addStockMock} />);
    // Assertions
    // déclencher un event de click sur le bouton (avec testing Library)
    fireEvent.click(screen.getByRole("button", { name: "Add a new stock" }));
    // vérifie si la fonction simulée a été appelée au moins une fois (avec jest)
    expect(addStockMock).toHaveBeenCalled();
  });
});
