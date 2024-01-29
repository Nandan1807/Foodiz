import { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./Contextreducer";

export default function Card(props) {

  let data = useCart();
  const priceRef = useRef();
  let dispatch = useDispatch();
  let options = props.detail.options[0];
  let optionKey = Object.keys(options);
  let [qty, setqty] = useState(1);
  let [size, setsize] = useState("");


  const handlecart = async () => {
    let food = []
    for(const item of data){
      if(item.id === props.detail._id){
        food = item;

        break;
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispatch({ type: "UPDATE", id: props.detail._id, price: finalPrice, qty: qty});
        return;
      }
      else if(food.size !== size){
        await dispatch({ type: "Add", id: props.detail._id, name: props.detail.name, price: finalPrice, qty: qty, size: size })
        return;
      }
      return;
    }
    await dispatch({ type: "Add", id: props.detail._id, name: props.detail.name, price: finalPrice, qty: qty, size: size })
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card" style={{ width: "21.5rem", height: "550px" }}>
        <img
          src={props.detail.img}
          className="card-img-top h-50"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.detail.name}</h5>
          <p className="card-text">{props.detail.description}</p>
          <div className="container-flex w-100">
            <div className="d-inline btn-group">
              <button className="d-inline btn rounded"onClick={()=>{
                if(qty>1){
                  let quantity = qty;
                  quantity--;
                  setqty(quantity);
                }
              }}>-</button>
              <div className="d-inline fs-4 m-3 btn text-center">{qty}</div>
              <button className="d-inline btn rounded" onClick={()=>{
                let quantity = qty;
                quantity++;
                setqty(quantity);
              }}>+</button>
            </div>
            <select className="d-inline form-select ms-2 w-50" ref={priceRef} onChange={(e) => setsize(e.target.value)}>
              {
                optionKey.map((option) => { return <option key={option} value={option}>{option}</option> })
              }
            </select>
            <div className="fs-5 m-2">
              ₹{finalPrice}/-
            </div>
          </div>
          {
            (localStorage.getItem("authToken")) ?
            <>
            <hr></hr>
            <div className="text-center">
              <button className="btn btn-danger w-75  btn1" onClick={handlecart}>Add to cart</button>
            </div>
            </> : ""
          }
        </div>
      </div>
    </div>
  );
}
