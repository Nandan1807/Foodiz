import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Model";
import Cart from "../Screens/Cart";
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
            Foodiz
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
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">
                  My orders
                </Link> : ""
              }
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">
                <Link className="btn btn-light btn1 m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light btn1 m-2" to="/createuser">
                  Signup
                </Link>
              </div> :
              <div className="d-flex">
                <Link className="btn btn-light btn1 m-2" aria-current="page"onClick={()=>setcartview(true)}>
                  My cart
                </Link>
                {cartview? <Modal onClose={()=>setcartview(false)}><Cart/></Modal> :null}
                <a className="btn btn-light text-danger btn1 m-2" aria-current="page" href="/" onClick={handlelogout}>
                  Log out
                </a>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  );
}
