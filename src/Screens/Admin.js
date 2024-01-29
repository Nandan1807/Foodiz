import { Link, Outlet } from "react-router-dom";

export default function Admin() {
    return (
        <>
            {
                (localStorage.getItem("userEmail") === "admin@gmail.com") ?
                    <>
                        <div className="text-center" style={{ height: "20vh", backgroundImage: "linear-gradient(red, black)" }}>
                            <div className="pt-4 fw-bold fs-1">Admin Panel</div>
                        </div>
                        <div class="card text-center">
                            <div class="card-header">
                                <ul class="nav nav-tabs card-header-tabs">
                                    <li class="nav-item w-50 fs-4">
                                        <Link class="nav-link  text-light" aria-current="true" to={"/foodiz/admin"}>Products</Link>
                                    </li>
                                    <li class="nav-item w-50 fs-4">
                                        <Link class="nav-link text-light" to="/foodiz/admin/orders">Orders</Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <Outlet/>
                            </div>
                        </div>
                    </>
                    :
                    <div>You are not admin</div>
            }
        </>
    );
}