import React from "react";
import Axios from 'axios';
import './my_ui.css'
import querystr from 'querystring';
import Path from "./path";

import Supervisor from "./supervisor";

class real extends React.Component{
    constructor(props){

        super(props);

        if(localStorage.getItem("token") === null) {
            window.location.pathname = "/login"
        }

        this.state = {
            variables:[],

        }

        Axios.get("http://localhost:8080/api/get_variable_alarmes").then((res)=>{
            res.data.forEach((i)=>{
                i.displayed = true ;
                i.path = false ;

                i.supervision = false ;
            })
            this.setState({variables:res.data})
            console.log(res.data)

        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return <div className={"col-xs-12"}>

            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                Mes variables en Temps Réel </h1>
            <div className={"interline_more"}> supervisez en temps réel vos variable </div>
            <div className={"interline liner"}></div>

            <h3 style={{textAlign:"left"}}>Organisation :</h3>

            <div className={"col-xs-12"} style={{textAlign:"left",fontWeight:"bold"}}>
                <div className={"col-xs-12 interline"}></div>
                <div className={"item_object "}>
                    nom variable :
                </div>

                <div  className={"item_object"}>
                    description variable :
                </div>
                <div  className={"item_object"}>
                    priorité variable :
                </div>

            </div>

            <div className={"col-xs-12 interline  "}></div>


            { this.state.variables.map((i,ty)=>{

                return ( <div className={"col-xs-12"}>

                        <div key={i.var_id} className={"col-xs-12 line_object"} style={{fontSize: "90%", fontWeight: "bold"}}>
                            <div className={"item_object col-xs-2"}>
                                {i.var_nom}
                            </div>

                            <div className={"item_object col-xs-3"}>

                                {i.var_description}

                            </div>
                            <div className={"item_object col-xs-1"}>
                                {i.var_priorite}
                            </div>

                            <div  className={"item_object  col-xs-3"} >
                                <input type={"button"} className={"my_button_v16"} value={" Visualiser supervision "} onClick={(()=>{
                                    let ls = this.state.variables ;
                                    ls[ty].supervision = ! ls[ty].supervision ;
                                    ls[ty].path= false ;
                                    this.setState({variables:ls})
                                })} />
                            </div>

                            <div  className={"item_object  col-xs-2"}>
                                <input type={"button"} className={"my_button_v16"} value={" ADD Alarme"} onClick={(()=>{
                                    this.props.history.push("/add_alarme/"+this.state.variables[ty].var_id)
                                })} />
                            </div>
                            <div  className={"item_object  col-xs-1"} >
                                <input type={"button"} className={"my_button_v16"} value={" localiser"} onClick={(()=>{
                                    let ls = this.state.variables ;
                                    ls[ty].path = !ls[ty].path ;
                                    ls[ty].displayed = false ;
                                    this.setState({variables:ls})
                                })} />
                            </div>




                        </div>
                        {i.supervision&&<Supervisor var_id={i.var_id} />}

                        {i.path&&<Path _id={i.obj_id} />}


                    </div>

                )})
            }

            <div className={"col-xs-12 interline"} style={{minHeight:"100px"}}></div>

        </div>
    }
}

export default real