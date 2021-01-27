import {notification, Input, Button} from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SheetDetail.css'



export default class SheetDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            answers: []
        }
        }
        componentDidMount = () => {
                const data = JSON.parse(localStorage.getItem('sheetData'));
                this.setState({data: data});
        };
       
        

        resolve = async (e) => {
            try{
            e.preventDefault() 
            const data = JSON.parse(localStorage.getItem('sheetData'))
            const URL = `http://localhost:3000/sheets/${this.state.data._id}`
            for(let i = 0; i < e.target.length; i++){
                this.state.answers.push((e.target[i].value))
            }
            const answer = {
                "answers": this.state.answers
            }
            await axios.patch(URL, answer)
            notification['success']({
                message: "Ficha enviada!!"
            })
            this.props.history.push('/alumno')
            }catch(error){
                console.log(error)
            }      
        }
        goBack(){
            this.props.history.push('/alumno')
        }
        showSheet = () => {
            if(this.state.data?._id){
                return(
                    <div className="sheet">
                        <div className="title"> {this.state.data.title} </div>
                        <div className="area">{this.state.data.area} </div>
                        <div className="subject"> {this.state.data.subject} </div>
                        {this.state.data.questions.map(quest=>{
                            return(
                            <>
                            <div key={quest} className="quest">{quest}
                            <Input type="text"  placeholder="indique su respuesta"></Input>
                            </div>
                            </>
                        )})}
                    </div>
                )
            }else return <div>CARGANDO</div>
        }
    
    render(){
        return (
            <>
            <div className="nav-container">
                    <Link className="link" to="/" onClick={()=> this.goBack()}>Atras</Link>
            </div>

            <div className="form-container">
                <form className="register-form" onSubmit={this.resolve} key={this.state.data.questions}>
                    
                    {this.showSheet()}
                    <Button  className="sheet-button" htmlType="submit">Enviar</Button>
                    <Button className="sheet-button" onClick={() => this.goBack()}>Atras</Button>
                </form>
            </div>  
            </>  
        )
    }
}