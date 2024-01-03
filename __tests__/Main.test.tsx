import { assert, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Main from "../components/Main";

test("Отображение компонента Main с детьми", () => {
  render(<Main>Тестовый текст</Main>);

  const mainElement = screen.getByText(/Тестовый текст/i);
  assert.isDefined(mainElement);
});
