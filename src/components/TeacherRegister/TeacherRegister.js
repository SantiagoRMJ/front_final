import React from 'react'
import {notification} from 'antd'
import 'antd/dist/antd.css';
import { Input } from 'antd';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './TeacherRegister.css'

const URL = "http://localhost:3000/teacher"

const TeacherRegister = () => {
    const history = useHistory()
    const register = async (e) =>{        
        try{
        e.preventDefault()    
        const form = e.target
        const User = {
                "name": form.name.value,
                "email": form.email.value,
                "pass": form.pass.value,
                "classes": form.classes.value,
                "grade": form.grade.value,
                "subject": form.subject.value
        }
        console.log(User)
        if(!User.email || !User.pass|| !User.name){
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
            console.error(error)
        }
    }
      
    return (
        <form className="register-form" onSubmit={register}>
                <Input
                type="text"
                name="name"
                placeholder="Nombre"
                className="register-form__input"
                size="small"
                />                
                <Input
                type="text"
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
                name="classes"
                placeholder="clases"
                className="register-form__input"
                size="small"
                />      
                 <Input
                type="text"
                name="grade"
                placeholder="curso"
                className="register-form__input"
                size="small"
                />  
                 <Input
                type="text"
                name="subject"
                placeholder="asignaturas"
                className="register-form__input"
                size="small"
                />                           
                <button htmlType="submit" className="register-form__button">
                    crear cuenta
                </button>
        </form>
    )
}

export default TeacherRegister;