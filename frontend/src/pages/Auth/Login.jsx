import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthLayout } from '../../components/layouts';
import { Input } from '../../components/inputs';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError("");

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                username,
                password
            });
            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                navigate("/admin/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className='w-full max-w-md mx-auto flex flex-col justify-center'>
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Please enter your login details
                </p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        label="Username"
                        placeholder="adminuser"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="********"
                        type="password"
                    />
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button type="submit" className='btn-primary mt-2'>
                        Login
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
