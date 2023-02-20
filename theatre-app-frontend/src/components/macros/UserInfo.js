import React, {useState} from "react";
import {update} from "../../services/loginService";


const UserInfo = ({ userInfo }) => {
    const [email, setEmail] = useState(userInfo.email);
    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updateResponse = await update({ email, firstName, lastName, token });
            if (updateResponse.id) {
                alert('Updated!')
            } else {
                alert("Input types may not be proper");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div>
                <h1> User Information </h1>
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
                        <button id="sub_btn" type="submit">Update</button>
                    </p>
                </form>
            </div>
        </>
    );
};

export default UserInfo;
