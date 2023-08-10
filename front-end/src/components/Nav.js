import React from 'react';
import { Link, useNavigate, } from 'react-router-dom';


const Nav = () => {
    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate("/signup");
    }

    return (
        <div>
            {auth ? <ul className='nav-ul'>
                
                <li><Link to="/product">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile ({JSON.parse(auth).name})</Link></li>
                <li><Link onClick={logout} to="/login">Logout</Link></li>

            </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    
                </ul>
            }
        </div>
    )
}

export default Nav;