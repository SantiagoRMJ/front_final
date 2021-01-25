import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Link, useHistory} from 'react-router-dom';
import 'antd/dist/antd.css';
import './CreateSheet.css';
import { Form, Input, Button} from 'antd';
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
    const token = JSON.parse(localStorage.getItem('token'));
    console.log("TOKEN", token.id)
    console.log(values.ejercicio, select.target.value, inputSubject.target.value, inputArea.target.value, inputTitle.target.value);
    const sheet = {
        subject: inputSubject.target.value,
        grade: select.target.value,
        area: inputArea.target.value,
        title: inputTitle.target.value,
        questions: values.ejercicio,
        teacher: token.id
    };
    await axios.post('http://localhost:3000/sheets', sheet)
    history.push('/profesor')
    console.log("SHEET", sheet);
        }catch(error){
            console.log(error)
        }
  };
  

  return (
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
          <Form.Item>
          <p>Curso</p>  
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
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
      <Form.Item>
      <Link to="/profesor">atrás</Link>
      </Form.Item>
    </Form>
  );
};


export default CreateSheet;