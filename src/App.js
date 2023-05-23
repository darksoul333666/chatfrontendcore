import logo from './logo.svg';
import './App.css';
import { router } from './routes/Router';
import {
  RouterProvider
} from "react-router-dom";
function App() {
  return (
    <div style={{heigth:"100%", width:"100%", display:'flex'}} >
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
