import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from "./components/AddProduct";
import ProductList from './components/ProductList';
import Login from './components/login';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile.js';




function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            
            <Route path='/product' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>Log Out Component</h1>} />
            <Route path='/profile' element={<Profile/>} />
          </Route>

          
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
