import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Form from "../components/Form";
import Home from "../components/Home";
import App from "../App";
import Login from "../components/login/Login";
import Logout from "../components/Logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="project/add" element={<Form />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </Route>
  )
);

function WebRouter() {
  return <RouterProvider router={router} />;
}

export default WebRouter;
