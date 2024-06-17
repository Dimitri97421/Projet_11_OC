import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email:username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'setToken', payload: data.body.token });
                navigate('/user');
            } else {
                alert('Identifiants incorrects');
            }
        } catch (error) {
            alert('Erreur durant la connexion : ' + error.message);
        }
    };

  
    return (
        <div>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className='sign-in-button' onClick={handleSignIn}>Sign In</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default SignIn;