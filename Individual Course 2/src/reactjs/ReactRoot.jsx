import { Part1 } from "./part1Presenter.jsx";
import { Demographics } from "./demographicsPresenter.jsx";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { Complete } from "./completePresenter.jsx";






function ReactRoot() {
  return <RouterProvider router={makeRouter()} />;
}

function makeRouter() {
  return createHashRouter([
    { path: "/",             element: <Navigate to="/demographics" /> },
    { path: "/demographics", element: <Demographics /> },
    { path: "/part1",        element: <Part1 /> },
    { path: "/complete",     element: <Complete /> },
  ]);
}

export { ReactRoot };
