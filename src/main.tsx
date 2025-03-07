import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

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

function RedirectComponent() {
  const shortCode = window.location.pathname.substring(1);
  window.location.href = `https://url-shortener-frontend-phi.vercel.app/${shortCode}`;
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
