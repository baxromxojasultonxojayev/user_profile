// src/types/jest-dom.d.ts
import "@testing-library/jest-dom/extend-expect";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      // Add more custom matchers if needed
    }
  }
}
