import React, { useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Navbar = ({ setToken }) => {

    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);


    const logout = () => {

        localStorage.removeItem("adminToken");

        if (setToken) {
            setToken("");
        }

        toast.success("Logout successful");

        navigate("/");

    };


    return (

        <div className='navbar'>

            <img
                className='logo'
                src={assets.logo}
                alt="logo"
            />


            <div className="navbar-profile">

                <img
                    className="profile"
                    src={assets.profile_image}
                    alt="profile"
                    onClick={() => setShowProfile(!showProfile)}
                />


                {
                    showProfile &&
                    <div className="profile-dropdown">

                        <p onClick={logout}>
                            Logout
                        </p>

                    </div>
                }

            </div>

        </div>

    );

};


export default Navbar;
