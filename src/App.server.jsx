import renderHydrogen from "@shopify/hydrogen/entry-server";
import { FileRoutes, Route, Router } from "@shopify/hydrogen";
import { Suspense } from "react";
import NotFound from "./routes/404.server";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <FileRoutes />
        <Route path="*" page={<NotFound />} />
      </Router>
    </Suspense>
  );
}

export default renderHydrogen(App);
