import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Add this import
import Button from "..";

describe("Button Component", () => {
  it("matches snapshot without props", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it("clicking save button", () => {
    const { container, rerender } = render(<Button mode="edit" />);

    rerender(<Button mode="save" />);
    expect(container).toMatchSnapshot();
    expect(
      screen.getByRole("button", { name: /Saqlash/i })
    ).toBeInTheDocument();
  });

  it("clicking cancel button", () => {
    const { container, rerender } = render(<Button mode="cancel" />);

    rerender(<Button mode="cancel" />);
    expect(container).toMatchSnapshot();

    expect(
      screen.getByRole("button", { name: /Bekor qilish/i })
    ).toBeInTheDocument();
  });

  it("clicking edit button", () => {
    const { container, rerender } = render(<Button mode="save" />);

    rerender(<Button mode="edit" />);
    expect(container).toMatchSnapshot();

    expect(
      screen.getByRole("button", { name: /O'zgartirish/i })
    ).toBeInTheDocument();
  });
});
