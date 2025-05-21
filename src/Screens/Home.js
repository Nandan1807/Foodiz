import { useEffect, useState } from "react";
import Card from "../Components/card";
import "../styles.css";
import "../css/load.css"


export default function Home() {

  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);
  const [search, setsearch] = useState("");
  const [loaded,setloaded] = useState(false);

  const loadData = async () => {
    await fetch("https://backend-xi-weld.vercel.app/api/fooddata")
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setloaded(true);
          setfooditem(res[0]);
          setfoodcat(res[1]);
        } else if (res !== null && typeof res === 'object') {
          console.log('not loaded.');
        }
      });

    // console.log(fooditem, foodcat);
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <>
      {/* -----------------------carousel--------------------- */}
      {
        loaded ?
          <>
            <div>
              <div
                id="carouselExampleRide"
                className="carousel slide d-flex flex-row justify-content-center"
                data-bs-ride="true"
              >
                <div
                  className="carousel-inner"
                  style={{
                    filter: "brightness(70%)"
                  }}
                >
                  <div className="carousel-item active">
                    <img
                      src={fooditem[Math.floor((Math.random() * fooditem.length) + 1)].img}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={fooditem[Math.floor((Math.random() * fooditem.length) + 1)].img}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={fooditem[Math.floor((Math.random() * fooditem.length) + 1)].img}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={fooditem[Math.floor((Math.random() * fooditem.length) + 1)].img}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={fooditem[Math.floor((Math.random() * fooditem.length) + 1)].img}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <div className="d-flex justify-content-center" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => {
                        setsearch(e.target.value)
                      }}
                    />
                    {/* <button className="btn btn-danger">
                Search
              </button> */}
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleRide"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleRide"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            {/* ------------------------------------------------------- */}

            {
              foodcat.length>0?
                <>
                <div className="list-group list-group-horizontal  overflow-auto w-75 mx-auto my-5">
                <div className="list-group-item btn btn-danger w-50 btn-default" data-mdb-ripple-color="dark" onClick={()=>setsearch("")}>All</div>
                  {
                    foodcat.map((cat)=>{
                      return(
                        <div className="list-group-item btn btn-danger w-50 mx-1 btn-default" data-mdb-ripple-color="dark" onClick={()=>setsearch(cat.CategoryName)}>{cat.CategoryName}</div>
                      );
                    })
                  }
                </div>
                </>
              :""
            }

            {/* -----------------------------card----------------------------- */}
            <div className="container">
              {
                foodcat.length > 0
                  ? fooditem.length > 0
                    ? foodcat.map((cat) => {
                      return (
                        <>
                          {
                            fooditem.filter((item) => (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()) || item.CategoryName.toLowerCase().includes(search.toLowerCase()))).length > 0
                              ? <div className="row mt-5">
                                <div key={cat._id} className="fs-3 text-center  m-3">{cat.CategoryName}</div>
                                <hr></hr>
                                {
                                  fooditem.length > 0
                                    ? fooditem.filter((item) => (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()) || item.CategoryName.toLowerCase().includes(search.toLowerCase())))
                                      .map((filteritems) => {
                                        return (
                                          <div key={filteritems._id} className="d-flex flex-row justify-content-center col-12 col-md-6 col-lg-4 gy-5">
                                            <Card detail={filteritems}></Card>
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
          :
          <div style={{ height: "80vh" }}>
            <div class="loader mt-5 h-100 justify-center">
              <div class="loader__circle"></div>
              <div class="loader__circle"></div>
              <div class="loader__circle"></div>
              <div class="loader__circle"></div>
            </div>
          </div>
      }
    </>
  );
}
