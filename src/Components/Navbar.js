import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Model";
import Cart from "../Screens/Cart";
import '../styles.css';
export default function Navbar() {
  const [cartview,setcartview] = useState(false);
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-opacity-75 bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fw-bold" to="/">
            Food!z
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mt-2 ms-3">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">
                  My orders
                </Link>
                </li> : ""
              }
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/contact">
                  Contact us
                </Link>
              </li>
              {
                  (localStorage.getItem("userEmail") === "admin@gmail.com") ?
                  <Link className="nav-link active fs-5" to="/foodiz/admin">
                    Admin panel
                  </Link>
                  :""
              }
              

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">
                <Link className="navbar__button btn btn-dark m-2" to="/login">
                <i class="fas fa-sign-in-alt me-2"></i>  Login
                </Link>
                <Link className="navbar__button btn btn-dark m-2" to="/createuser">
                <i class="fas fa-user-plus me-2"></i>Signup
                </Link>
              </div> :
              <div className="d-flex">
                <Link className="navbar__button btn btn-dark m-2"  aria-current="page"onClick={()=>setcartview(true)}>
                <i class="fas fa-shopping-cart me-2"></i> My cart
                </Link>
                {cartview? <Modal onClose={()=>setcartview(false)}><Cart/></Modal> :null}
                <a className="navbar__button btn btn-dark text-danger m-2" aria-current="page" href="/" onClick={handlelogout}>
                <i class="fas fa-sign-out-alt me-2"></i> Log out
                </a>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  );
}
