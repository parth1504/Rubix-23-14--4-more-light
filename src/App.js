
import './App.css';
import{BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FarmerProduct from './pages/FarmerProduct';
import CustomerProduct from './pages/CustomerProduct';

function App() {
  return (
    <Router>
    <Routes>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/signup' element={<Signup/>}/>
      <Route path ='/farmer' element={<FarmerProduct/>}/>
      <Route path ='/customer' element={<CustomerProduct/>}/>
    </Routes>
  </Router>
  );
}

export default App;
