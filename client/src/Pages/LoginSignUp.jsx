import React, { useState } from 'react'

import './CSS/LoginSignupStyles.css'
import { Link, useNavigate } from 'react-router-dom'

function LoginSignup() {
    const navigate = useNavigate()
    const [state, setState] = useState('Login')
    const [formData, setFormData] = useState({
        username : "",
        password : "",
        email : ""
    })

    const login = async () => {
        console.log('logging in function executed', formData);
        let responseData
        await fetch('http://localhost:5000/login', {
            method : 'POST',
            headers : {
                Accept : 'application/form-data',
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data)

        if(responseData.success) {
            localStorage.setItem('auth-token', responseData.token)
            navigate('/')
        } else {
            alert(responseData.errors)
        }
    }
    const signup = async () => {
        console.log('signup function executed', formData)
        let responseData
        await fetch('http://localhost:5000/signup', {
            method : 'POST',
            headers : {
                Accept : 'application/form-data',
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data)

        if(responseData.success) {
            localStorage.setItem('auth-token', responseData.token)
            navigate("/")
        } else {
            alert(responseData.errors)
        }
    }
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === 'Sign Up' && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => {state === 'Sign Up' ? signup() : login()}}>Continue</button>
                {state === 'Sign Up' ? <p className="loginsignup-login">
                    Already have an Account,&nbsp; <span onClick={() => setState('Login')}>Login Here</span>
                </p> :
                <p className="loginsignup-login">
                    Do Not have an Account,&nbsp; <span onClick={() => setState('Sign Up')}>SignUp Here</span>
                </p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By Continuing, I Agree to The Terms of use & Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
