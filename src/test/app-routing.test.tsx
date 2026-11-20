import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App router configuration", () => {
  it("inicializa a árvore de rotas com sucesso no caminho raiz '/'", async () => {
    const queryClient = new QueryClient();
    const router = createRouter({
      routeTree,
      context: { queryClient },
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    await router.load();
    expect(router.state.status).toBe("idle");
    expect(router.state.location.pathname).toBe("/");
  });

  it("carrega a rota de coleção atual '/colecao-atual' corretamente", async () => {
    const queryClient = new QueryClient();
    const router = createRouter({
      routeTree,
      context: { queryClient },
      history: createMemoryHistory({ initialEntries: ["/colecao-atual"] }),
    });

    await router.load();
    expect(router.state.status).toBe("idle");
    expect(router.state.location.pathname).toBe("/colecao-atual");
  });

  it("carrega a rota de produtos '/produtos' corretamente", async () => {
    const queryClient = new QueryClient();
    const router = createRouter({
      routeTree,
      context: { queryClient },
      history: createMemoryHistory({ initialEntries: ["/produtos"] }),
    });

    await router.load();
    expect(router.state.status).toBe("idle");
    expect(router.state.location.pathname).toBe("/produtos");
  });
});
