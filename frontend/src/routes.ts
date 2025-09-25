import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import Invitation from "./pages/Invitation";

export const routes: RouteDefinition[] = [
  {
    path: "/invitation/:id",
    component: Invitation,
  },
  {
    path: "/internal",
    component: lazy(() => import("./pages/Internal")),
  },
  {
    path: "**",
    component: lazy(() => import("./component/NotFound")),
  },
];
