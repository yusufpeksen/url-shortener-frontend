import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

function RedirectComponent() {
  const { shortCode } = useParams();

  if (shortCode) {
    window.location.replace(
      `https://sour-caitrin-yusufpeksen-e967d44c.koyeb.app/${shortCode}`
    );
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:shortCode",
    element: <RedirectComponent />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
