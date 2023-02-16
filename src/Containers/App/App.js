import Login from 'Components/Login/Login';
import Home from 'Containers/Home/Home';
import { Provider } from 'react-redux';
import store from './store';


export default function App() {
  return (
    <Provider store={store}>
      <Login></Login>
      <Home></Home>
    </Provider>
    
  );
}
