import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
    const nav = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "", geolocation: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://foodizbackend.onrender.com/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password, location: user.geolocation })
        })
        const res = await response.json()

        if (!res.success) {
            alert("enter valid details")
        } else { nav("/login") }
    }

    const change = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container">
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up Here</h3>

                <label for="name">User name</label>
                <input type="text" placeholder="Username" id="username" required name="name" value={user.name} onChange={change} />

                <label for="Email">Email address</label>
                <input type="email" placeholder="Email" id="username" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" title="Enter valid email" required aria-describedby="emailHelp" name="email" value={user.email} onChange={change} />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required name="password" value={user.password} onChange={change} />

                <label for="Geolocation">Address</label>
                <input type="text" placeholder="Geolocation" required name="geolocation" value={user.geolocation} onChange={change} />

                <button className="button" type="submit">Sign up</button>
                <div class="social">
                    <div class="w-100"><Link to={"/login"} className="btn fw-bold w-100"> Already a user</Link></div>
                </div>
            </form>
            </div>
        </>
    )
}