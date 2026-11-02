import { Part1 } from "./part1Presenter.jsx";
import { Consent } from "./consentPresenter.jsx";
import { Demographics } from "./demographicsPresenter.jsx";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { Complete } from "./completePresenter.jsx";

function readStored(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

// 未勾选知情同意时不能进入后续页面
function RequireConsent({ children }) {
  return readStored("consent")?.consent === true ? children : <Navigate to="/consent" replace />;
}

// 没有填写 participant code 时不能进入实验
function RequireParticipant({ children }) {
  return readStored("participantInfo")?.participantCode ? children : <Navigate to="/demographics" replace />;
}






function ReactRoot() {
  return <RouterProvider router={makeRouter()} />;
}

function makeRouter() {
  return createHashRouter([
    { path: "/",             element: <Navigate to="/consent" /> },
    { path: "/consent",      element: <Consent /> },
    { path: "/demographics", element: <RequireConsent><Demographics /></RequireConsent> },
    { path: "/part1",        element: <RequireConsent><RequireParticipant><Part1 /></RequireParticipant></RequireConsent> },
    { path: "/complete",     element: <Complete /> },
  ]);
}

export { ReactRoot };
