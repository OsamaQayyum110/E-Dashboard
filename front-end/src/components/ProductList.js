import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();

    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });

        result = await result.json();
        setProducts(result);
    }
    console.log("products", products)

    const deleteproduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",

            headers: {
                authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`
            }

        });
        result = await result.json()
        if (result) {
            alert("Record is delete!")
            getProducts();
        }
    };

    const searchProduct = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }


    }

    return (
        <div className="product-list">

            <h3>Product List</h3>

            <input className="search" type="text" placeholder="Search"
                onChange={searchProduct} />
                
            <ul>
                <li>S. no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price} PKR </li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteproduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id} ><button>Update</button></Link>
                        </li>
                    </ul>
                ) : <h1>No result found</h1>
            }
        </div>
    )

}

export default ProductList;