import {notification, Input} from 'antd'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import React, { Component } from 'react'



export default class StudentDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            sheets: []
        }
        }
        componentDidMount = async () => {
            try{
            const data = JSON.parse(localStorage.getItem('studentData'));
            this.setState({data: data});
            const sheets = await axios.get(`http://localhost:3000/sheets/${data._id}`) 
            this.setState({sheets: sheets})
            }catch(err){
                console.log(err)
            }
        };
        prueba = () =>{

            console.log(this.state.sheets.data.sheet)
        }
       
        showStudentSheets = async () =>{
            console.log(this.state.sheets)
            if(this.state.sheets.data.sheet[0]){
                return(
                    this.state.sheets.data.sheet.map(sheet => {
                        return(
                            <div className="body" key={sheet._id}>
                                <div>{sheet.title}</div>
                            </div>
                        )
                    }))         
            }else{
                return(<div>CARGANDO LOS DATOS.</div>)
            }   

        } 
        
       
        goBack(){
            localStorage.removeItem('studentData')
            this.props.history.push('/profesor')
        }
        showStudent = () => {
            if(this.state.data?._id){
                return(
                    <div className="student">
                        <div className="name"> {this.state.data.name} </div>
                       
                    </div>
                )
            }else return <div>CARGANDO</div>
        }
    
    render(){
        return (
            
            <>
                <div>{this.showStudent()}</div>
                <div>{this.showStudentSheets()}</div>
                <button onClick={() => this.goBack()}>Atras</button>
                <button onClick={() => this.prueba()}>PRUEBA</button>
                
            </>
                
        )
    }
}