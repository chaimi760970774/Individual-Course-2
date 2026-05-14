import { Part1 } from "./part1Presenter.jsx";
import { Part2 } from "./part2Presenter.jsx";
import { Demographics } from "./demographicsPresenter.jsx";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { Part3 } from "./part3Presenter.jsx";




function ReactRoot() {
  return <RouterProvider router={makeRouter()} />;
}

function makeRouter() {
  return createHashRouter([
    { path: "/",             element: <Navigate to="/demographics" /> },
    { path: "/demographics", element: <Demographics /> },
    { path: "/part1",        element: <Part1 /> },
    { path: "/part2",        element: <Part2 /> },
    { path: "/part3",        element: <Part3 /> },
  ]);
}

export { ReactRoot };
