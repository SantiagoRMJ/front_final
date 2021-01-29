import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Link, useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import './CreateSheet.css';
import { Form, Input, Button, notification} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const CreateSheet = () => {
  const history = useHistory();
  const [select, setSelect] = useState('1');
  const [inputSubject, setInputSubject] = useState('');
  const [inputArea, setInputArea] = useState('');
  const [inputTitle, setInputTitle] = useState('');

  const onFinish = async values => {
      try{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(values.ejercicio, select.target.value, inputSubject.target.value, inputArea.target.value, inputTitle.target.value);
    const sheet = {
        subject: inputSubject.target.value,
        grade: select.target.value,
        area: inputArea.target.value,
        title: inputTitle.target.value,
        questions: values.ejercicio,
        teacher: user._id
    };
    await axios.post('https://back-easy-homework.herokuapp.com/sheets', sheet, {headers:{token}});
    notification['success']({
      message: "Ficha enviada correctamente!!!"
    })
    history.push('/profesor')
        }catch(error){
            console.log(error)
        }
  };
  const logOut = () =>{
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="create-form-container">
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>      
      <Form.List
        name="ejercicio"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error('Introduce al menos 1 ejercicio'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
          <div className="nav-container">
                 
                 <Link className="link" to="/" onClick={()=> logOut()}>Cerrar sesion</Link>
            </div>
          <Form.Item>
          <p className="curso">Curso</p>  
          <select style={{ width: '5%' }} defaultValue="1" onChange={e =>{setSelect(e)}}>
              <option value="1">1º</option>
              <option value="2">2º</option>
              <option value="3">3º</option>
              <option value="4">4º</option>
              <option value="5">5º</option>
              <option value="6">6º</option>
          </select>
        </Form.Item>
        <Form.Item>
        <Input placeholder="Titulo de la ficha"
             name="title"
             type="text"  
             onChange={(e)=>setInputTitle(e)}
             style={{ width: '80%' }} />
        </Form.Item>
        <Form.Item>
        <Input placeholder="Area"
             name="area"
             type="text"  
             onChange={(e)=>setInputArea(e)}
             style={{ width: '80%' }} />
        </Form.Item>
        <Form.Item>
        <Input placeholder="Asignatura"
             name="subject"
             type="text"  
             onChange={(e)=>setInputSubject(e)}
             style={{ width: '80%' }} />
        </Form.Item>
        
            {fields.map((field, index) => (
                
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Ejercicios: ' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Por favor, introduce un ejercicio o elimina este elemento.",
                    },
                  ]}
                  noStyle
                >
                    
                  <Input placeholder="ejercicio" style={{ width: '80%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '80%'}}
                icon={<PlusOutlined />}
              >
                Añadir ejercicio
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button className="downButton" type="primary" htmlType="submit">
          Enviar
        </Button>
        <Button className="downButton" onClick={() => history.push('/profesor')}>Atrás</Button>
      </Form.Item>
    </Form>
    </div>
  );
};


export default CreateSheet;