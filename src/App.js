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
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import Layout from "./Screens/Layout";
import AdminContact from "./Components/AdminCountactUs";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/myorder" element={<MyOrders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/foodiz/admin" element={<Admin />} >
              <Route index element={<AdminItems />} />
              <Route path="/foodiz/admin/orders" element={<Adminorders />} />
              <Route path="/foodiz/admin/feedbacks" element={<AdminContact/>} />
            </Route>
            <Route path="/foodiz/admin/form/:id" element={<Adminform />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}
