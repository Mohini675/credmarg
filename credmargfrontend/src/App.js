import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import CustomNavbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Employee from './pages/Employee';
import Vendors from './pages/Vendors';
import Dashboard from './components/Dashboard';
import AdminProvider from './context/AdminProvider';


function App() {
  return (
    <AdminProvider>
    <BrowserRouter>
    <ToastContainer/>
    <CustomNavbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
      <Route path="/employees" element={<Employee/>}/>
      <Route path="/vendors" element={<Vendors/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
    </Routes>
    </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
