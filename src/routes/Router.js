import {
    createBrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import NewTemplate from "../components/NewTemplate";


 export const router = createBrowserRouter([
    {
      path: "/nav",
      element: <SideMenu/> ,
      children: [
        {
          path: "newTemplate",
          element: <NewTemplate/>,
        },
      ],
    }
  ]);