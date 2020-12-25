import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'redux-react-hook';
import { withRouter } from 'react-router-dom';
import * as actions from '../../constants/action_types';
import * as routes from '../../constants/routes';

function Signup(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = setter => e =>  {
        setter(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requestBody = {
                query: `mutation {
                    createUser(userInput: {
                        phone: "${phone}",
                        password: "${password}",
                        confirm: "${confirm}"
                    }) {
                        _id,
                        token,
                        phone
                    }
                }`
            };

            const { data } = await axios.post('http://localhost:3001/graphql', requestBody);

            if (data.errors) {
                setError(data.errors[0].message);
                setLoading(false);
            }
            else {
                setError(null);
                setLoading(false);
                const { _id, token } = await data.data.createUser;

                // dispatch value and set new value for the authUser
                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        _id,
                        email
                    }
                });

                // store token into our localStorage
                localStorage.setItem('token', token);

                // redirect url to homepage
                props.history.push(routes.HOME);
            }

        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            <div className="auth-form">
                <form onSubmit={submit}>
                    <input className="form-input" type="phone" placeholder="Email" value={phone} onChange={handleChange(setPhone)} />
                    <input className="form-input" type="password" placeholder="Password" value={password} onChange={handleChange(setPassword)} />
                    <input className="form-input" type="password" placeholder="Confirm Password" value={confirm} onChange={handleChange(setConfirm)} />
                    <div><span style={{ color: "red" }}>{ error || "" }</span></div>
                    <input className="form-submit" type="submit" value={loading ? "Verifying..." : "Register"} />
                </form>
            </div>
        </>
    );
}

export default withRouter(Signup);
