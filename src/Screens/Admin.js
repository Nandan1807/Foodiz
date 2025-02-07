import { Link, Outlet } from "react-router-dom";

export default function Admin() {
    return (
        <>
            {
                (localStorage.getItem("userEmail") === "admin@gmail.com") ?
                    <>
                        <div style={{ height: "20vh", backgroundImage: "linear-gradient(red, black)" }}>
                            <Link className="btn w-100 text-start fw-bold fs-6" style={{width:"100px"}} to={"/"}>← Back</Link>
                            <div className="pt-4 text-center w-100 fw-bold fs-1">Admin Panel</div>
                        </div>
                        <div class="card text-center">
                            <div class="card-header">
                                <ul class="list-group list-group-horizontal nav nav-tabs card-header-tabs row">
                                    <li class="list-item nav-item  fs-4 col">
                                        <Link class="nav-link btn btn-danger text-light" data-mdb-ripple-color="dark" aria-current="true" to={"/foodiz/admin"}>Products</Link>
                                    </li>
                                    <li class="list-item nav-item  fs-4 col">
                                        <Link class="nav-link btn btn-danger text-light" data-mdb-ripple-color="dark" to="/foodiz/admin/orders">Orders</Link>
                                    </li>
                                    <li class="list-item nav-item fs-4 col">
                                        <Link class="nav-link btn btn-danger text-light" data-mdb-ripple-color="dark" to="/foodiz/admin/feedbacks">Feedbacks</Link>
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