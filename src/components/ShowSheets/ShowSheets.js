import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './ShowSheets.css'

 class ShowSheets extends Component {
    constructor(props){
        super(props)

        this.state = {
            sheets: [],
        }
        }
    
        async componentDidMount(){
            try {
                const allSheets = await axios.get('https://back-easy-homework.herokuapp.com/sheets');
                this.setState({sheets: allSheets.data});
            }catch(err){
                console.log(err)
            }
        }   
        showSheets(){
            if(this.state.sheets[0]){
                return(
                    this.state.sheets.map(sheet => {
                        return(
                            <div className="home" key={sheet.id}>
                                {sheet.title}
                            </div>
                        
                        )
                    }))         
            }else{
                return(<div>CARGANDO LOS DATOS.</div>)
            }   
        }
  
   
     

    render() {
        return (
             <div className="sheets"> 
                 <div className="sheets_show" >{this.showSheets()}</div>
                 <Link to="/profesor">Volver</Link>
             </div>
             )
    }
}

export default ShowSheets;