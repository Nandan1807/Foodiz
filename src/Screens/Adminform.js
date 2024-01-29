import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./signup.css";

export default function Adminform() {
    const params = useParams();
    const nav = useNavigate();
    const [item, setItem] = useState({ CategoryName: "", name: "", img: "", options: [], description: "" });
    const [opt, setopt] = useState(0);
    const [next, setnext] = useState(true);
    const [togle, settogle] = useState(false);
    const [inskey, setinskey] = useState("");
    const [insvalue, setinsvalue] = useState("");

    useEffect(() => {
        if (params.id !== "0") {
            fetch("http://localhost:8000/api/getonefooddata/" + params.id)
                .then(res => res.json())
                .then(res => setItem(res))
        }
    }, [params.id]);

    const handleSubmit = () => {

        if (params.id !== "0") {
            fetch("http://localhost:8000/api/updatefooddata/" + params.id, {
                method: "PUT",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(item)
            }).then(nav("/foodiz/admin"))
        }
        else {
            fetch("http://localhost:8000/api/insertfooddata", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(item)
            }).then(nav("/foodiz/admin"))
        }
    }

    const handleNext = () => {
        console.log(item);
        setnext(false);
        console.log(item);
    }

    const change = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    }

    const handleInputChange = (index, currentKey, newKey, newValue) => {
        setItem(prevstate => {
            const updatedOptions = [...prevstate.options];
            const updatedOption = { ...updatedOptions[index] };
            const Value = updatedOption[currentKey];
            for (let i = 0; i < updatedOptions.length; i++) {
                if (updatedOptions[i][currentKey] == Value) {
                    updatedOptions[i][newKey] = newValue;
                }
            }

            // delete updatedOption[currentKey];

            // // Add the new key-value pair
            // updatedOption[newKey] = newValue;

            // // Update the options array
            // updatedOptions[index] = updatedOption;

            return {
                options: updatedOptions,
            };
        })
    }

    const handleSave = () => {
        setItem((prevstate) => {
            let updatedOptions = { ...prevstate.options[0] };
            let newobj = {};
            newobj[inskey] = insvalue;

            let newoptions = { ...updatedOptions, ...newobj };
            return {
                ...prevstate, // Spread the existing state
                options: [newoptions],
            };
        });
        setopt(0);
        setinskey("");
        setinsvalue("");
        settogle(false);
    };


    return (
        <>
            <div className="container">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                {next ?
                    <form>

                        <label htmlFor="CatagoryName">Category name</label>
                        <input type="text" placeholder="Category name" id="Categoryname" required name="CategoryName" value={item.CategoryName} onChange={change} />

                        <label htmlFor="name">Item name</label>
                        <input type="text" placeholder="Item name" id="itemname" required name="name" value={item.name} onChange={change} />

                        <label htmlFor="image">Image</label>
                        <input type="text" placeholder="image" id="image" required name="img" value={item.img} onChange={change} />

                        <label htmlFor="description">Description</label>
                        <textarea type="text" placeholder="description" id="description" rows={3} cols={39} required name="description" value={item.description} onChange={change} ></textarea>

                        <button className="button" type="submit" onClick={handleNext}>Next</button>
                    </form>
                    :
                    <form onSubmit={handleSubmit}>
                        <div className="overflow-auto h-50">
                            {
                                item.options.length > 0 ?
                                    item.options.map((option, index) => {
                                        return (
                                            Object.keys(option).map((key) => (
                                                <div>
                                                    <label>Option:</label>
                                                    <input type="text" placeholder="Enter option" value={key} onChange={(e) => handleInputChange(index, key, e.target.value, option[key])} required />
                                                    <input type="text" placeholder="Enter price" value={option[key]} onChange={(e) => handleInputChange(index, key, key, e.target.value)} required />
                                                    <hr />
                                                </div>
                                            ))
                                        )
                                    })
                                    : ""
                            }{opt > 0 ?
                                [...Array(opt)].map(() => (
                                    <div>
                                        <label>Option:</label>
                                        <input type="text" placeholder="Enter option" value={inskey} onChange={(e) => setinskey(e.target.value)} required />
                                        <input type="text" placeholder="Enter price" value={insvalue} onChange={(e) => setinsvalue(e.target.value)} required />
                                        <hr />
                                    </div>
                                ))
                                : ""
                            }
                        </div>
                        <button className="button" type="submit">submit</button>
                        {
                            inskey === "" && insvalue === "" ?
                                <div class="social">
                                    <div className="btn w-100 disabled fw-bold">save</div>
                                </div>
                                :
                                <div class="social">
                                    <div className="btn w-100 fw-bold" onClick={() => handleSave()}>save</div>
                                </div>
                        }

                        {
                            togle ?
                                <div class="social">
                                    <div className="btn w-100 disabled fw-bold">Add option</div>
                                </div>
                                :
                                <div class="social">
                                    <div className="btn w-100 fw-bold" onClick={() => { setopt(opt + 1); settogle(true) }}>Add option</div>
                                </div>
                        }

                    </form>
                }
            </div>
        </>
    )
}