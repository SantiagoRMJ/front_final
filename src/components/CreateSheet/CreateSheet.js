import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './CreateSheet.css';
import { Form, Input, Button} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
  const onFinish = values => {
    console.log(values.ejercicio[2]);
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
          <select style={{ width: '5%' }}>
              <option>1º</option>
              <option>2º</option>
              <option>3º</option>
              <option>4º</option>
              <option>5º</option>
              <option>6º</option>
          </select>
        </Form.Item>
        <Form.Item>
        <Input placeholder="Titulo de la ficha" style={{ width: '80%' }} />
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
      <Link to="/profesor">atrás</Link>
    </Form>
  );
};


export default CreateSheet;