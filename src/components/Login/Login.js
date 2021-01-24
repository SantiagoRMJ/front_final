import axios from 'axios';
import React, { useState } from 'react';
import { Input, notification } from 'antd';
//import './Login.css'
import { useHistory } from 'react-router-dom';

import jwt_decode from "jwt-decode";



const Login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const URL = 'http://localhost:3000/login'
    const history = useHistory();
    const login = async (e) => {
        try {
            e.preventDefault();
            const post = await axios.post(URL, {name,email,pass})
            const user = jwt_decode(post.data.token)
            localStorage.setItem('token', JSON.stringify(user))
            console.log(user)
            notification['success']({
                message: "Login correcto!"
            })
            if(!user.role) history.push('/');
            if(user.role === "teacher") history.push('/profesor');
            if(user.role === "student") history.push('/alumno');
        } catch (error) {
            console.error(error)
        }
    
    }
    return (
        <form className="Login-form" onSubmit={login}>
            <Input
                 type="text" 
                 onChange={e=>setName(e.target.value)} 
                 name="name" 
                 placeholder="Nombre" 
                 value={name} 
                 className="login-form_input"/>
            <Input 
                 type="email" 
                 onChange={e=>setEmail(e.target.value)} 
                 name="email" 
                 placeholder="Email" 
                 value={email} 
                 className="login-form_input"/>
            <Input 
                 type="password" 
                 onChange={e=>setPass(e.target.value)} 
                 name="password" placeholder="Contraseña" 
                 value={pass} 
                 className="login-form_input"/>
            <button type="submit" className="button">Enviar</button>
        </form>
    )
}


export default Login;

