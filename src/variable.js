import React from "react";
import Axios from 'axios';
import './my_ui.css'
import querystr from 'querystring';
import Path from "./path";

class variable extends React.Component{
    constructor(props){

        super(props);


        this.real_time = this.props.real_time ;

        if (localStorage.getItem("token") === null) {
            window.location.pathname = "/login"
        }

        this.state = {
            variables:[],

        }

        Axios.get("http://localhost:8080/api/get_variable_alarmes").then((res)=>{
            res.data.forEach((i)=>{
                i.displayed = true ;
                i.path = false ;
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
                Mes variables & Alarmes </h1>
            <div className={"interline_more"}> ajouter ici les variables supervisés ainsi que leurs alarmes actifs </div>
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

                <div  className={"item_object  col-xs-2"}>
                    <input type={"button"} className={"my_button_v16"} value={" ADD Alarme"} onClick={(()=>{
                        this.props.history.push("/add_alarme/"+this.state.variables[ty].var_id)
                    })} />
                </div>
                    <div  className={"item_object  col-xs-2"} >
                        <input type={"button"} className={"my_button_v16"} value={" localiser"} onClick={(()=>{
                            let ls = this.state.variables ;
                            ls[ty].path = !ls[ty].path ;
                            ls[ty].displayed = false ;
                            this.setState({variable:ls})
                        })} />
                    </div>
                    <div  className={"item_object  col-xs-2"} >
                        <input type={"button"} className={"my_button_v16"} value={(()=>{
                            if(this.state.variables[ty].displayed){
                                return "-"
                            }
                            else{
                                return "+"
                            }
                        })()+"  Alarmes "} onClick={(()=>{
                            let ls = this.state.variables ;
                            ls[ty].displayed = ! ls[ty].displayed
                            this.setState({variables:ls})
                        })} />
                    </div>



                </div>
                    {i.path&&<Path _id={i.obj_id} />}

                    {(i.alarmes.length>0)&&i.displayed&&<div className={"col-xs-12"} style={{fontWeight:"bold"}}>
                        <div className={"item_object col-xs-1"}>

                        </div>
                        <div className={"item_object col-xs-3"}>
                            Description:
                        </div>
                        <div className={"item_object col-xs-2"}>
                           valeur MAX:
                        </div>
                        <div className={"item_object col-xs-2"}>
                            valeur Min:
                        </div>
                        <div className={"item_object col-xs-2"}>
                            Niveau:
                        </div>
                    </div>}

                {i.displayed&&i.alarmes.map((j,itr)=>{
                    return <div className={"col-xs-12"} style={{paddingLeft:"50px"}} key={itr}>
                        <div key={i.var_id} className={"col-xs-12 line_object"} style={{fontSize: "90%", fontWeight: "bold"}}>

                            <div className={"item_object col-xs-2"}>
                                Alarme {itr+1} :
                            </div>

                            <div className={"item_object col-xs-3"}>
                            {j.description}
                        </div>
                            <div className={"item_object col-xs-2"}>
                               {j.seuil_max}
                                                 </div>
                            <div className={"item_object col-xs-2"}>
                                {j.seuil_min}
                            </div>
                            <div className={"item_object col-xs-2"}>
                                {j.niveau}
                            </div>




                        </div>


                    </div>
                })
                }
                </div>

            )})
            }

            <div className={"col-xs-12 interline"} style={{minHeight:"100px"}}></div>

        </div>
    }
}

export default variable