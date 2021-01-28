import axios from 'axios';
import React, { useState } from 'react';
import { Input, notification, Button } from 'antd';
import './Login.css'
import { useHistory } from 'react-router-dom';





const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const URL = 'https://back-easy-homework.herokuapp.com/login'
    const history = useHistory();
    const login = async (e) => {
        try {
            e.preventDefault();
            const post = await axios.post(URL, {email,pass})
            const user = post.data.data
            const token = post.data.token
            localStorage.setItem('user', JSON.stringify(user))

            console.log("user:", user, "token:", token)
            localStorage.setItem('token', JSON.stringify(token))
            notification['success']({
                message: "Login correcto!"
            })
            if(!user.role) history.push('/');
            if(user.role === "teacher") history.push('/profesor');
            if(user.role === "student") history.push('/alumno');
        } catch (error) {
            notification['error']({
                message: "Datos introducidos incorrectos"
            })
        }
    
    }
    return (
        <>
        <div className="nav-container">
                    
        </div>
        <div className="form-container">
            <form className="login-form" onSubmit={login}>
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
                <button type="submit" className="login-button">Enviar</button>
                <Button type="submit"
                className="login-form_button"
                onClick={() => history.push('/')}>
                    Atras
                </Button>
            </form>
        </div>
        </>
    )
}


export default Login;

