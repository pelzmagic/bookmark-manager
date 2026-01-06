import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
