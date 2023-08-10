import React, { useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate =useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
        });
        result = await result.json()
        setName(result.name)
        setCategory(result.category)
        setCompany(result.company)
        setPrice(result.price)
    }


    const updateproduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`

            },
        });
        result = await result.json();
        if(result){
            navigate("/product")
        };


    }

    return (
        <div className="product">

            <h1>Update Product</h1>

            <input type="text" className="inputbox" placeholder="Enter product name"
             value={name} onChange={(e) => { setName(e.target.value) }} />



            <input type="text" className="inputbox" placeholder="Enter product price" 
             value={price} onChange={(e) => { setPrice(e.target.value) }} />



            <input type="text" className="inputbox" placeholder="Enter product category"
             value={category} onChange={(e) => { setCategory(e.target.value) }} />



            <input type="text" className="inputbox" placeholder="Enter product company" 
             value={company} onChange={(e) => { setCompany(e.target.value) }} />


            <button onClick={updateproduct} className="appButton">Update Product</button>

        </div>
    )
}


export default UpdateProduct; 