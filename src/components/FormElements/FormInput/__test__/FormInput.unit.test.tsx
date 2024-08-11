import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormInput from "..";

describe("FormInput Component", () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  const defaultProps = {
    name: "testInput",
    label: "Test Label",
    value: "Initial Value",
    type: "text",
    onChange: mockOnChange,
    onBlur: mockOnBlur,
    error: {},
  };

  it("renders the input with the correct label", () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
  });

  it("renders with the correct initial value", () => {
    render(<FormInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(
      /Test Label/i
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("Initial Value");
  });

  it("calls onChange handler when input value changes", () => {
    render(<FormInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(
      /Test Label/i
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur handler when input loses focus", () => {
    render(<FormInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(
      /Test Label/i
    ) as HTMLInputElement;
    fireEvent.blur(inputElement);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("renders without crashing when no value is provided", () => {
    render(<FormInput {...defaultProps} value={undefined} />);
    const inputElement = screen.getByLabelText(
      /Test Label/i
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("");
  });
});
