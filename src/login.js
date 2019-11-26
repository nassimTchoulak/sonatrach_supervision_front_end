import React from 'react';
import './my_ui.css'

import Axios from 'axios';
import querystr from 'querystring';
import {is_logged } from './login_api'

class login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            err_login:false
        }
         ;
    }
    login = event =>{
        let mail = document.querySelector("#mail").value ;
        let pwd = document.querySelector("#pwd").value ;

        console.log(mail,pwd);
        Axios.post("http://localhost:8080/api/login", querystr.stringify({user_email: mail, user_pwd: pwd}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(
            (res)=>{
                if(res.data.status){
                    localStorage.setItem("token",res.data.user.user_id);
                    localStorage.setItem("user",JSON.stringify(res.data));
                    setTimeout(()=>{
                        this.props.history.push("/");
                    },100);
                }
                else {
                    this.setState({err_login:true})
                }
            }
        ).catch((err)=>{
            console.log(err)
        })

    }


    render() {
        return <div style={{paddingTop:"30px"}} className={"col-xs-12"}>
            <div className={"interline_more "} style={{paddingLeft:"60px",paddingRight:"60px",fontSize:"125%"}}>
                <div style={{fontSize:"180%"}}>  Bienvenue </div>
                <div>Veuillez vous connecter pour accéder au service de supervision
                </div>
                <div className={"my_logo"}>SMART-SONATRACH</div>


            </div>

            <div className={"col-xs-12 liner interline"}style={{marginBottom:"50px"}}></div>

            <div className={"col-xs-12 interline_more"} style={{fontSize:"120%"}}>

                <div className={"col-xs-12"}>
            <div className={"col-xs-offset-3 col-xs-6"}>
                <input type={"text"} className={"my_text_box_v2"} style={{paddingTop:"10px",paddingBottom:"10px"}} id={"mail"}
                       placeholder={"     e-mail       "}/>
            </div>
                </div>
                <div className={"col-xs-12 interline"}></div>

            <div className={"col-xs-12"}>
                <div className={"col-xs-offset-3 col-xs-6"}>
                <input type={"password"} className={"my_text_box_v2"} placeholder={"     password      "} id={"pwd"}
                       style={{paddingTop:"10px",paddingBottom:"10px"}}  />
                </div>
            </div>

            </div>

            <div className={"col-xs-10 col-xs-offset-1"} >
                <div className={"col-xs-6 col-xs-offset-3"}>
                    <input type={"button"}  className={"my_button_v2"} style={{marginTop:"60px",fontSize:"150%"}} onClick={this.login}
                           value={"Connexion"}/>

                </div>
            </div>
            {this.state.err_login&&<div className={"col-xs-12"}> pwd ou user incorrect</div>}

        </div>
    }
}
export default login ;