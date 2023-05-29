import {
    createBrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import NewTemplate from "../components/NewTemplate";
import HeaderComponent from "../components/HeaderTemplate";
import  ChatComponent  from "../components/ChatComponent";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <SideMenu/> ,
      children: [
        {
          path: "newTemplate",
          element: <NewTemplate/>,
        },
         {
          path: "template/:templateId",
          element: <>templateId</>,
        },
         {
          path: "header",
          element: <HeaderComponent/>,
        },{

       
        path:"chat",
        element: <ChatComponent/>,
      }
      ],
    }
  ]);