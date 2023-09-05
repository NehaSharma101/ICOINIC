import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Components/route/private.js';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Createcategory from './pages/Admin/Createcategory';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateUsers from './pages/Admin/CreateUsers';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path='/register' element={< Register/>}/>
      <Route path='/login' element={< Login/>}/>
      <Route path='/search' element= {<Search/>}/>
      <Route path='/forgot-password' element={< ForgotPassword/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/category/:slug' element={<CategoryProduct/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      
      {/* <Route path='/dashboard' element={<PrivateRoute/>}> */}
          <Route path='/dashboard' element={< Dashboard/>}/> 
          <Route path='/Dashboard/orders' element={< Orders/>}/> 
          <Route path='/Dashboard/profile' element={< Profile/>}/> 
      {/* </Route> */}
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/admin-dashboard/create-category' element={<Createcategory/>}/>
      <Route path='/admin-dashboard/create-product' element={<CreateProduct/>}/>
      <Route path='/admin-dashboard/create-users' element={<CreateUsers  />}/>
      <Route path='/products' element={<Product/>}/>
      <Route path='/product/:slug' element={<UpdateProduct/>}/>
      <Route path="/*" element={<Pagenotfound/>}/>
    </Routes>
    </div>
    
  );
}

export default App;
