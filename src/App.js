import logo from './logo.svg';
import './App.css';
import { router } from './routes/Router';
import {
  RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function App() {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store} >
    <div style={{heigth:"100%", width:"100%", display:'flex'}} >
    <RouterProvider router={router} />
    </div>
    </Provider>

  );
}

export default App;
