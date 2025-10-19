import './login.css';
import image from '../../images/lim logo.jpg';
import back from '../../images/tim-navis-Flxl7OUuO1M-unsplash.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function Login(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
        const res = await axios.post("http://localhost:5000/api/login", {
            email,
            password,
        });

        // for storing tokens in web storage api
        const role = res.data.user.role;

        if (role === "lecturer") {
            navigate("/lecturer");
        } else if (role === "student") {
            navigate("/Student");
        } else if (role === "prl") { 
            navigate("/Principal");
        } else if (role === "pl") { 
            navigate("/Program-leader");
        } else {
            navigate("/");
        }
        // the data that will be displayed in the console upon logining in
        console.log(res.data);
        
        } catch (err) {
            setError(err.reponse?.data?.message||'Login failed!!🙂‍')
            console.log('API URL:', process.env.REACT_APP_API_URL);
            console.log(err)
        }
    };
    return(
        <>
            <div 
                className='container-fluid d-flex justify-content-center align-items-center min-vh-100'
                style={{
                    backgroundImage:`url(${back})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                >
                <div className='row rounded-5 p-3 shadow box-area blur-container'>
                    <div className='col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box' style={{background:'black'}}>
                        <div className='featured-image mb-3'>
                            <img src={image} alt='log in' className='img-fluid' width='250px'/>
                        </div>
                        <h1 className='text-white fw-bolb fs-2' style={{fontFamily:'sans serif'}}>LIMOKOKWING UNIVERSITY</h1>
                        <hr className='border-light opacity-25 w-50 mx-auto'/>
                        <small className='text-white-50 fst-italic fs-5' style={{fontFamily:'sans serif'}}>Be the best</small>
                    </div>

                    <div className='col-md-6 right-box'>
                        <div className='row align-items-center'>
                            <div className='header-text md-4'>
                                <p className='text-white'></p>
                                <p className='text-white'></p>
                            </div>
                            <div className='input-group mb-3'>
                                <input 
                                type='email' 
                                className=' form-control form-control-lg bg-light fs-6' 
                                placeholder='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                            </div>

                            <div className='input-group mb-3'>
                                <input 
                                type='password' 
                                className=' form-control form-control-lg bg-light fs-6' 
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            </div>
                            <div className='input-group mb-5 d-flex justify-content-between'>
                                <div className='form-check'>
                                    <input type='checkbox' className='form-check-input' id='formcheck'/>
                                    <label for='formcheck' className='form-check-label text-white'><small>Remember me</small></label>
                                </div>
                                <div className='forgot'>
                                    <small><a href='.'> Forgot Password?</a></small>
                                </div>
                            </div>
                            <div className='input-group mb-3'>
                                <button
                                type='submit' 
                                className='btn btn-lg btn-dark w-100 fs-6'
                                onClick={handleSubmit}>Login
                                </button>
                            </div>
                            {error && <p className="text-danger text-center">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;