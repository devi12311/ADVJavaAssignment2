import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { login } from '../../services/loginService';

import '../../App.css'

export default function SignInPage() {

    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await login({ email, password });
            if (loginResponse['jwt-token']) {
                setUsername("");
                setPassword("");
                localStorage.setItem('token', loginResponse['jwt-token']);
                window.location.replace("/home");
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Email address</label><br/>
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
