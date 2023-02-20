import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import { register } from "../../services/loginService";

export default function SignUpPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await register({ email, password, firstName, lastName });
            if (loginResponse['jwt-token']) {
                setEmail("");
                setPassword("");
                localStorage.setItem('token', loginResponse['jwt-token']);
                window.location.replace("/home");
            } else {
                alert("Input types may not be proper");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>First Name</label><br/>
                    <input
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </p>
                <p>
                    <label>Last Name</label><br/>
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
