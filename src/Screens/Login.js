import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://foodizbackend.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    })
    const res = await response.json()
    if (!res.success) {
      alert("enter valid details")
    } else {
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("authToken", res.authtoken);
      nav("/");
    }
  }

  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return <>
    <div className="container">
    <div class="background1">
        <div class="shape1"></div>
        <div class="shape1"></div>
    </div>
    <form onSubmit={handleSubmit} className="form">
        <h3>Login Here</h3>

        <label for="Email">Email</label>
        <input type="email" placeholder="Email" id="username" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" title="Enter valid email" required aria-describedby="emailHelp" name="email" value={user.email} onChange={change} />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required name="password" value={user.password} onChange={change}/>

        <button className="button" type="submit">Log In</button>
        <div class="social">
          <div class="w-100"><Link to={"/createuser"} className="btn w-100 fw-bold"> New user</Link></div>
        </div>
    </form>
    </div>
  </>
}
