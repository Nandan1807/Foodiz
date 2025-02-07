import { useCart, useDispatch } from '../Components/Contextreducer';
import useRazorpay from 'react-razorpay';
export default function Cart() {
  const [Razorpay] = useRazorpay();
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const payNow = async () => {
    const options = {
      key: "rzp_test_HyRPqiPoRCRV9Q",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Foodiz",
      description: "Order Payment",
      prefill: {
        name: "user",
        email: "youremail@example.com",
        contact: "9999999999",
        method: 'upi', // Setting payment method to UPI
        vpa: 'your-upi-id@bank' // Replace with your UPI ID
      },
      handler: (response) => {
        console.log(response); // Handle the payment response here
        if (response.razorpay_payment_id) {
          console.log("done")
        } else {
          console.log("fail")
        }
      },
      theme: {
        color: "black",
      },
    };
  
    const rzpay = new Razorpay(options);
    rzpay.open();
  }
  


  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://foodizbackend.onrender.com/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      payNow()
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {/* {console.log(data)} */}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className='fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                 <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>⌫</button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn btn-danger mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}