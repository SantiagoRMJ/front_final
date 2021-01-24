import {notification, Input} from 'antd'
import { formatCountdown } from 'antd/lib/statistic/utils'
import axios from 'axios'
import React, { Component } from 'react'



export default class SheetDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
        }
        componentDidMount = () => {
                const data = JSON.parse(localStorage.getItem('sheetData'));
                this.setState({data: data});
        };
        patata = () =>{
            console.log("STATE", this.state.data.questions)
        }

        resolve = async (e) => {
            try{
            e.preventDefault() 
            const token = JSON.parse(localStorage.getItem('token'))
            const data = JSON.parse(localStorage.getItem('sheetData'))
            const URL = `http://localhost:3000/sheets/${this.state.data._id}`
            console.log(data)
            const answer = {
                "student": token.id,
                "sheet": this.state.data.id,
                "status": true,
                "questions": e.target.value
            }
            
            //await axios.post(URL, answer)
            console.log(answer)
            notification['success']({
                message: "Ficha enviada!!"
            })
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
                            console.log(quest)
                            return(
                            <>
                            <div key={quest}>{quest}</div>
                            <Input placeholder="indique su respuesta"></Input>
                            </>
                        )})}
                    </div>
                )
            }else return <div>CARGANDO</div>
        }
    
    render(){
        return (
            
            <form className="sheets" onSubmit={this.resolve()} key={this.state.data.questions}>
                {this.showSheet()}
                <button  htmlType="submit">enviar</button>
            </form>
                
        )
    }
}