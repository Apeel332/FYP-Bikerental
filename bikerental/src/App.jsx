import './App.css';
import Login from './login/login';
import Signup from './signup/signup';
import Home from './Home';
import Admin from './admin';
import AdminDashboard from './admin/admindashboard'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopSignup from './signup/ShopSignup';
import Shoplogin from './login/Shoplogin';
import Manager from './manager';
import BikeShops from './admin/bikeshops';
import EditShop from './admin/shopedit';
import About from './pages/About';
import Navbar from './user/Navbar';
import Contact from './pages/Contact';
import { Outlet } from 'react-router-dom';
import Rent from './pages/Rent';
import Yourbike from './pages/Yourbike';
import Addshops from './admin/Addshops';
import ShopReg from './admin/ShopReg';
import ManagerSidebar from './manager/ManagerSidebar';
import ViewShops from './pages/ViewShops';
import ManageBikes from './manager/ManageBikes';
import CreateBikes from './manager/CreateBikes';
import BookBike from './pages/BookBike';
import BookingRequest from './manager/BookingRequest';
import EditBike from './manager/EditBike';
import ManageShop from './manager/ManageShop';
import ShopDetails from './manager/ShopDetails';
import VerifyEmail from './login/VerifyEmail';


// Layout with Navbar
/*const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);*/

const WithNavbar = () => (
  <>
    <Navbar />
    <div className="main-content" style={{ padding: '20px' }}>
      <Outlet />
    </div>
  </>
);


function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/ShopSignup",
      element: <ShopSignup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify-email",
      element: <VerifyEmail  />,
    },
    
    {
      path: "/shoplogin",
      element: <Shoplogin />,
    },
    // {
    //   path: "/Home",
    //   element: <Home />,
    // },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admindashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/manager",
      element: <Manager />,
    },
    {
      path: "/manageshop",
      element: <ManageShop />,
    },
    {
      path: "/shopdetails",
      element: <ShopDetails />,
    },
    {
      path: "/bikeshops",
      element: <BikeShops />
    },
    {
      path: "/shopedit/:id",
      element: <EditShop />
    },
    {
      path: "/addshops",
      element: <Addshops />
    },
    {
      path: "/shopreg",
      element: <ShopReg />
    },
    {
      path: "/managersidebar",
      element: <ManagerSidebar />
    },
    {
      path: "/Viewshops/:id",
      element: <ViewShops />
    },
    {
      path: "/bookbike/:id",
      element: <BookBike />
    },
    {
      path: "/managebikes",
      element: <ManageBikes />
    },
    {
      path: "/createbikes",
      element: <CreateBikes />
    },
    {
      path: "/editBike/:bikeId",
      element: <EditBike />
    },
    {
      path: "/bookingreq",
      element: <BookingRequest />
    },
    {
      element: <WithNavbar />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact />},
        { path: "/rent", element: <Rent />},
        { path: "/bike", element: <Yourbike />}
    
  ]}
]);
  return <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  
}

export default App;
