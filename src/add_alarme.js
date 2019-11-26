import React from 'react' ;

import Axios from 'axios'
import querystr from 'querystring';

class add_alarme extends React.Component{
    constructor(props){
        super(props) ;

        this.state = {
            variable:{},
            msg:"",
            max:"",
            min:"",
            niveau:""
        }

        if(localStorage.getItem("token")===null){
            window.location.pathname="/login"
        }
        let slash = this.props.location.pathname.split("/");
        this.var_id = slash.pop();

        Axios.get("http://localhost:8080/api/get_variable_one?_id="+this.var_id).then((res)=>{
            console.log(res.data)
            this.setState({variable:res.data})
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return <div className={"col-xs-12"}>
            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                Ajouter Alarme </h1>
            <div className={"interline_more"}> ajouter ici une alarame pour une variable déja supervisé pour vous avertir  </div>
            <div className={"interline liner"}></div>

            {(this.state.variable.var_id!==undefined)&&<div className={"col-xs-12"}>
                <h3 style={{textAlign:"left"}}>Variable Concerné :</h3>

                <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> nom variable : {this.state.variable.var_nom} </div>

                <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> description : {this.state.variable.var_description} </div>

                <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> priorite: {this.state.variable.var_priorite} </div>

                <div className={"col-xs-12 interline"}></div>

                <h3 style={{textAlign:"left"}}>Information Alarme :</h3>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input id={"description5"} type={"text"} className={"my_text_box_v2"} placeholder={"description"} />
                </div> </div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input  type={"text"} value={this.state.max} className={"my_text_box_v2"} placeholder={"valeur max"} onChange={((event)=>{
                        if(!isNaN(event.target.value)){
                            this.setState({max:event.target.value})
                        }
                    })} />
                </div> </div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input  type={"text"}  value={this.state.min} className={"my_text_box_v2"} placeholder={"valeur min"}  onChange={((event)=>{
                        if(!isNaN(event.target.value)){
                            this.setState({min:event.target.value})
                        }
                    })}  />
                </div> </div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input  type={"text"} value={this.state.niveau} className={"my_text_box_v2"} placeholder={"niveau"}  onChange={((event)=>{
                        event.preventDefault();
                        if(!isNaN(event.target.value)){
                            this.setState({niveau:event.target.value})
                        }
                    })} />
                </div> </div>

                <div className={"col-xs-12 interline"}>{this.state.msg}</div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"60px",paddingBottom:"10px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input type={"button"} className={"my_button_v2"} value={"INSERER Alarme"} onClick={(()=>{

                        if((this.state.max==="")||(this.state.min==="")||(this.state.niveau==="")){
                            this.setState({msg:"des parametres maquants "})
                            return 0
                        }
                        console.log(document.querySelector("#description5") || "empty");

                        Axios.post("http://localhost:8080/api/post_alarme", querystr.stringify({
                                var_id:this.state.variable.var_id,
                            max:this.state.max,
                            min:this.state.min,
                            interval_rep:100,
                            niveau:this.state.niveau ,
                            description : document.querySelector("#description5").value || "empty",
                            user_id: localStorage.getItem("token")


                        }), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then((res)=>{
                            if(res.data.status){
                                this.props.history.push("/variable")
                            }
                            else{
                                this.setState({msg:"la variable est supervise pour ce niveau "})
                            }
                        })


                    })} />
                </div>
                </div>

                <div className={"col-xs-12 interline"}></div>





                </div>}


        </div>
    }

}
export default add_alarme ;