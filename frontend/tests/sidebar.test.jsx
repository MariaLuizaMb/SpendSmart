import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SidebarMenuSkeleton } from "../src/components/ui/sidebar";

describe("SidebarMenuSkeleton", () => {
  it("deve usar largura determinística por padrão", () => {
    const { container } = render(<SidebarMenuSkeleton />);

    expect(
      container.querySelector('[data-sidebar="menu-skeleton-text"]'),
    ).toHaveStyle({
      "--skeleton-width": "72%",
    });
  });

  it("deve permitir sobrescrever largura e exibir ícone", () => {
    const { container } = render(<SidebarMenuSkeleton showIcon width="64%" />);

    expect(
      container.querySelector('[data-sidebar="menu-skeleton-icon"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-sidebar="menu-skeleton-text"]'),
    ).toHaveStyle({
      "--skeleton-width": "64%",
    });
  });
});
