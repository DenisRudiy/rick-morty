import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer";

test("Footer component renders correctly", async () => {
  render(<Footer />);

  const textElement = screen.getByText(/Make with ❤️ for the MobProgramming team/i);
  expect(textElement).toBeDefined();
});
