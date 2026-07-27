import React, { useState } from "react";
import "./AdminLogin.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ url, setToken }) => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${url}api/admin/login`,
                data
            );

            if (response.data.success) {

                const token = response.data.token;

                localStorage.setItem(
                    "adminToken",
                    token
                );

                setToken(token);

                toast.success("Admin Login Successful");

                navigate("/add", { replace: true });

            } else {

                toast.error(response.data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error("Invalid admin credentials");

        }
    };

    return (
        <div className="admin-login">

            <form
                onSubmit={onLogin}
                className="admin-login-container"
            >

                <div className="admin-title">

                    <img
                        src={assets.logo}
                        alt="logo"
                    />

                    <h2>
                        Admin Login
                    </h2>

                </div>

                <div className="admin-input-box">

                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder="Admin Email"
                        required
                    />

                </div>

                <div className="admin-input-box password-box">

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder="Password"
                        required
                    />

                    <span
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {
                            showPassword
                                ? "👁️"
                                : "👁️‍🗨️"
                        }
                    </span>

                </div>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
};

export default AdminLogin;
