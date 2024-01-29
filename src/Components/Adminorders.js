import { useEffect, useState } from 'react';

export default function Adminorders() {
    const [orderData, setorderData] = useState([])

    const fetchMyOrder = async () => {
        await fetch("http://localhost:8000/api/allOrderData")
            .then(async (res) => {
                let response = await res.json()
                await setorderData(response)
            })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                {orderData !== {} ? orderData.map((emaildata) => {
                    return (
                        Array(emaildata).map(data => {
                            return (
                                <>
                                    <div className='mt-5 fs-3 p-3 bg-danger border rounded'>Email : {data.email}</div>
                                    <hr />
                                    {
                                        data ?
                                            data.order_data.slice(0).reverse().map((item) => {
                                                return (
                                                    item.map((arrayData) => {
                                                        return (
                                                            <>
                                                                {arrayData.Order_date ?
                                                                    <div className='m-auto mt-3 text-start'>

                                                                        {data = arrayData.Order_date}
                                                                        <hr />
                                                                    </div> :

                                                                    <div className='col-12 col-lg-6 text-start' >
                                                                        <div className="card mt-3" style={{ maxHeight: "360px" }}>
                                                                            <div className="card-body">
                                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                                    <span className='m-1'>{arrayData.qty}</span>
                                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                                    <span className='m-1'>{data}</span>
                                                                                    <div className=' d-inline ms-5 h-100 w-20 fs-4' >
                                                                                        ₹{arrayData.price}/-
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>



                                                                }

                                                            </>
                                                        )
                                                    })

                                                )
                                            }) : ""}
                                </>
                            )
                        }
                        )
                    )
                })

                    : ""}
            </div>
        </div>
    );
}