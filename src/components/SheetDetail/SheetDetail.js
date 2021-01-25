import {notification, Input} from 'antd'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import React, { Component } from 'react'



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
            console.log(data)
            console.log(e.target[0].value)

            for(let i = 0; i < e.target.length; i++){
                this.state.answers.push((e.target[i].value))
            }
            console.log(this.state.data)

            const answer = {
                "answers": this.state.answers
            }
            console.log(answer)
            //console.log(e.target[i])
            await axios.patch(URL, answer)
            console.log(answer)
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
                            console.log(quest)
                            return(
                            <>
                            <div key={quest}>{quest}
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
            
            <form className="sheets" onSubmit={this.resolve} key={this.state.data.questions}>
                
                {this.showSheet()}
                <button  htmlType="submit">enviar</button>
                <button onClick={() => this.goBack()}>Atras</button>
            </form>
                
        )
    }
}