import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Select, notification } from 'antd';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './TeacherRegister.css'


const URL = "http://localhost:3000/teacher"

const { Option } = Select;


const TeacherRegister = () => {
    const history = useHistory()
    const [select, setSelect] = useState('')
    

    const register = async (e) =>{        
        try{
        e.preventDefault()    
        const form = e.target
        
        const User = {
                "name": form.name.value,
                "email": form.email.value,
                "pass": form.pass.value,
                "class": form.class.value,
                "grade": select,
                "subject": form.subject.value
        }
        console.log("USER", !User.email || !User.pass || !User.name || !User.subject)
        if(!User.email || !User.pass || !User.name || !User.subject){
            notification['error']({
                message: "Todos los campos son obligatorios"
            })
            }else {
                    await axios.post("http://localhost:3000/teacher", User)
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
                />   {console.log("SELECT", select)}             
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
                name="class"
                placeholder="clase"
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
                <Select defaultValue="curso"
                style={{ width: 120 }} 
                className="register-form__input" 
                name="grade"
                value={select}
                type="text"
                size="small"
                onChange={e => setSelect(e)}>
                    <Option value="1">1º</Option>
                    <Option value="2">2º</Option>
                    <Option value="3">3º</Option>
                    <Option value="4">4º</Option>
                    <Option value="5">5º</Option>
                    <Option value="6">6º</Option>
                </Select>  
                <br/>                    
                <button htmlType="submit" className="register-form__button">
                    crear cuenta
                </button>
        </form>
    )
}

export default TeacherRegister;