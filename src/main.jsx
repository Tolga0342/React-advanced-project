import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as postLoader } from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import { AddEvent, loader as addLoader } from "./pages/AddEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { Theme } from "./components/Theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: postLoader,
        // action: addComment,
      },
      {
        path: "/addevent",
        element: <AddEvent />,
        loader: addLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
