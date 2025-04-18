import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("data-fetching/basic", "examples/data-fetching/basic-loader.tsx"),
  route("data-fetching/parallel", "examples/data-fetching/parallel-data.tsx"),
  route("advanced/form-actions", "examples/advanced-features/form-actions.tsx")
] satisfies RouteConfig;
