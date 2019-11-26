import React from 'react'
import Axios from 'axios'

class path extends React.Component{
    constructor(props){
        super(props);
        this._id = this.props._id ;
        this.state = {
            fathers:[]
        }
        if(this._id!==undefined){
           Axios.get("http://localhost:8080/api/get_one_object_line?_id="+this._id).then((res)=>{
               this.setState({fathers:res.data})
           }).catch((err)=>{
               console.log(err)
           })
        }


    }
    render(){

        return<div className={"col-xs-12"} style={{backgroundColor:"#22313f",paddingBottom:"10px"}}>

            {this.state.fathers.map((i)=>{
                return <div className={"col-xs-12 line_object"} style={{fontSize:"90%",fontWeight:"bold"}}>
                    <div className={"item_object"}>
                        {  i.obj_nom_physique }
                    </div>

                    <div  className={"item_object"}>
                        {  i.obj_nom_logique }
                    </div>
                    <div  className={"item_object"}>
                        {  i.obj_type }
                    </div>
                    <div  className={"item_object"}>
                        {  i.obj_adress }
                    </div>
                </div>
            })}

        </div>
    }
}
export default path ;