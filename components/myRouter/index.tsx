import { lazy } from "react";
import { RouterProvider, createHashRouter as createRouter } from "react-router-dom";
let Home = lazy(() => import("@/src/home"));

let Login = lazy(() => import("./Login"));
let Layout = lazy(() => import("./Layout"));
let Log = lazy(() => import("./Log"));

// 只是例子,随便写写
let router = createRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return "我是 loder data";
    },
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/log",
        element: <Log />,
      },
      {
        path: "*",
        element: (
          <>
            <h1>error 404</h1>
          </>
        ),
      },
    ],
  },
]);
export default function MyRouter() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

