import { Experiment } from "./experimentPresenter.jsx";
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

const ReactRoot = observer(
  function ReactRoot(props) {
    return (
      <div>
        <RouterProvider router={makeRouter(props.model)} />
      </div>
    );
  }
);

function LayoutWithHeadbar({ model }) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export function makeRouter(model) {
  return createHashRouter([
    {
      path: "/",
      element: <LayoutWithHeadbar model={model} />,
      children: [
        {
          path: "experiment",
          element: <Experiment />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/experiment" />,
    },
  ]);
}

export { ReactRoot };