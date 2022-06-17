import { Mode } from "vite-plugin-markdown";
import { ReactComponent } from "../contents/index.md";

export default function Home() {
  return (
    <div className="p-4 mx-auto prose md:p-6 lg:p-8">
      <ReactComponent />
    </div>
  );
}
