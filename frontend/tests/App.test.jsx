import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";

import App from "../src/App";
import { estaAutenticado } from "@/lib/auth";

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    (() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
});

vi.mock("@/lib/auth", () => ({
  estaAutenticado: vi.fn(),
  obterUsuario: vi.fn(() => ({ id: "u1", nome: "Maria" })),
}));

describe("App", () => {
  it("renderiza AppRoutes", () => {
    vi.mocked(estaAutenticado).mockReturnValue(false);

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Bem vindo de volta!/i }),
    ).toBeInTheDocument();
  });
});
