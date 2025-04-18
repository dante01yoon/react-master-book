import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import ExamplesNav from "../examples/ExamplesNav";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router Examples" },
    { name: "description", content: "Feature demonstrations for React Router" },
  ];
}

export default function Home() {
  return (
    <div className="space-y-10">
      <Welcome />
      <div className="mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <ExamplesNav />
      </div>
    </div>
  );
}
