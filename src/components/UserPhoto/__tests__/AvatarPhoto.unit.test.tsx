// AvatarPhoto.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AvatarPhoto from ".."; // Adjust the path as needed

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("AvatarPhoto Component", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("loads the image from local storage", () => {
    const storedImage = "data:image/png;base64,somebase64string";
    window.localStorage.setItem("user-photo", storedImage);

    render(<AvatarPhoto isModalOpen={false} />);

    const imgElement = screen.getByAltText("user-photo") as HTMLImageElement;
    expect(imgElement.src).toBe(storedImage);
  });

  it("displays a default image when there is no image in local storage", () => {
    render(<AvatarPhoto isModalOpen={false} />);

    const imgElement = screen.getByAltText("user-photo") as HTMLImageElement;
    expect(imgElement.src).toContain("https://picsum.photos/id/1/200/300");
  });

  it("displays uploading status when a file is being uploaded", async () => {
    render(<AvatarPhoto isModalOpen={true} />);

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const inputElement = screen.getByTestId("pencil-icon") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { files: [file] } });
  });
});
