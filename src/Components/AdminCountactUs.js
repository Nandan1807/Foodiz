import { useEffect, useState } from 'react';

export default function AdminContact() {
    const [feedbackData, setfeedbackData] = useState([])

    const fetchFeedbacks = async () => {
        await fetch("https://backend-xi-weld.vercel.app/api/allContactUsData")
            .then(async (res) => {
                let response = await res.json()
                await setfeedbackData(response)
            })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                {feedbackData.length > 0 ? feedbackData.map((emaildata) => {
                    return (
                        Array(emaildata).map(data => {
                            return (
                                <>
                                    <div className='mt-5 fs-3 p-3 bg-danger border rounded'>Email : {data.email}</div>
                                    <hr />
                                    {
                                        data ?
                                            data.feedback_data.slice(0).reverse().map((item) => {
                                                return (
                                                    item.map((arrayData) => {
                                                        return (
                                                            <>
                                                                {arrayData.Feedback_date ?
                                                                    <div className='m-auto mt-3 text-start'>

                                                                        {data = arrayData.Feedback_date}
                                                                        <hr />
                                                                    </div> :

                                                                    <div className='col-12 col-lg-6 text-start' >
                                                                        <div className="card mt-3" style={{ maxHeight: "360px" }}>
                                                                            <div className="card-body">
                                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                                    <span className='m-1'>{arrayData.message}</span>
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