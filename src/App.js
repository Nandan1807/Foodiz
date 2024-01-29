import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { CartProvider } from "./Components/Contextreducer";
import MyOrders from "./Screens/MyOrders";
import Home from "./Screens/Home";  
import Admin from "./Screens/Admin";
import AdminItems from "./Components/AdminItems";
import Adminorders from "./Components/Adminorders";
import Adminform from "./Screens/Adminform";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/foodiz/admin" element={<Admin/>} >
            <Route index element={<AdminItems/>} />
            <Route path="/foodiz/admin/orders" element={<Adminorders/>} />
            </Route>
            <Route path="/foodiz/admin/form/:id" element={<Adminform/>} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
