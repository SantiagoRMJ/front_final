import React from 'react'
import 'antd/dist/antd.css';
import { Input, notification, Button, Form } from 'antd';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './StudentRegister.css'

const URL = "http://localhost:3000/student"



const StudentRegister = () => {
    const history = useHistory()

    
    const register = async (e) =>{        
        try{
        e.preventDefault()    
        const form = e.target
        
        const User = {
                "name": form.name.value,
                "email": form.email.value,
                "pass": form.pass.value,
                "class": form.class.value,
        }
        if(!User.email || !User.pass|| !User.name || !User.class){
           notification['error']({
                message: "Todos los campos son obligatorios"
            })
            }else { 
                
                    await axios.post(URL, User)
                    notification['success']({
                        message: "Usuario añadido correctamente"
                    })
                    history.push('/login')
              }    
        } catch(error){
            notification['error']({
                message: "El email se encuentra registrado"
            })
            console.error(error)
        }
    }
      
    return (
        <>
        <div className="nav-container">
                    
        </div>
        <div className="form-container">
        <Form className="register-form" onSubmit={register}>
                <Input
                type="text"
                name="name"
                placeholder="Nombre"
                className="register-form__input"
                size="small"
                />                
                <Input
                type="email"
                name="email"
                placeholder="Correo electronico"
                className="register-form__input"
                size="small"
                />
                <Input
                type="password"
                name="pass"
                placeholder="Contraseña"
                className="register-form__input"
                size="small"
                />     
                 <Input
                type="text"
                name="class"
                placeholder="clase"
                className="register-form__input"
                size="small"
                />      
                                    
                <Button htmlType="submit" className="register-form__button">
                    crear cuenta
                </Button>
                <Button htmlType="submit" className="register-form__button" onClick={()=>{history.push('/')}}>
                    Atrás
                </Button>
        </Form>
        </div>
        </>
    )
}

export default StudentRegister;