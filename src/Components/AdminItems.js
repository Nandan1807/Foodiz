import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function () {
    const [foodcat, setfoodcat] = useState([]);
    const [fooditem, setfooditem] = useState([]);

    const loadData = async () => {
        await fetch("http://localhost:8000/api/fooddata")
            .then((res) => res.json())
            .then((res) => {
                setfooditem(res[0]);
                setfoodcat(res[1])
            });

        // console.log(fooditem, foodcat);
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <>
        <Link className="btn btn-lg w-100 btn-danger" to={"/foodiz/admin/form/0"}>+ Add items</Link>
        <div className="container">
            {
                foodcat.length > 0
                    ? fooditem.length > 0
                        ? foodcat.map((cat) => {
                            return (
                                <>
                                    {
                                        fooditem.filter((item) => (item.CategoryName === cat.CategoryName)).length > 0
                                            ? <div className="row mt-5">
                                                <div key={cat._id} className="fs-3  bg-danger border rounded p-3">{cat.CategoryName}</div>
                                                <hr></hr>
                                                {
                                                    fooditem.length > 0
                                                        ? fooditem.filter((item) => (item.CategoryName === cat.CategoryName))
                                                            .map((filteritems) => {
                                                                return (
                                                                    <div key={filteritems._id} className="col-12 col-lg-6 gy-5">
                                                                        <div class="container bcontent">
                                                                            <div class="card">
                                                                                <div class="row no-gutters">
                                                                                    <div class="col-md-6">
                                                                                        <img class="card-img" style={{height:"255px"}} src={filteritems.img} alt=""/>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <div class="card-body">
                                                                                            <h5 class="card-title">{filteritems.name}</h5>
                                                                                            <p class="card-text">{filteritems.description}</p>
                                                                                            <p>
                                                                                            {
                                                                                                Object.keys(filteritems.options[0])
                                                                                                .map((option)=>{
                                                                                                    return(
                                                                                                        <div>{option}  :  ₹{filteritems.options[0][option]}/-</div>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                            </p>
                                                                                            <Link className="btn btn-danger" to={"/foodiz/admin/form/"+filteritems._id}>Update</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        : <div>No such data found</div>
                                                }
                                            </div>
                                            : ""
                                    }
                                </>
                            );
                        })
                        : ""
                    : ""
            }
        </div>
        </>
    );
}