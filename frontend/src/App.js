import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/NavigationBar';
import Home from './Home';
import Login from './components/Login';
import MyOrders from './pages/MyOrders';
import NavigationBar from './components/NavigationBar';
import MainSection from './components/MainSection';
import AuthProvider from './AuthProvider';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
   
    <div className="App">
    <BrowserRouter>
    <AuthProvider>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<PrivateRoute />}>
   <Route path='/home' element={<MainSection/>} />
   <Route path='/myorders' element={<MyOrders/>} /> 
   </Route>     
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
