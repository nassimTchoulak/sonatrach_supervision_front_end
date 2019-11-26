import React from "react";
import Axios from 'axios';
import querystr from 'querystring';



class add_object extends React.Component{
    constructor(props){
        super(props);

        if(localStorage.getItem("token")===null){
            window.location.pathname="/login"
        }
        let slash = this.props.location.pathname.split("/");
        this.obj_pere ="";

        let ls = [] ;
        slash.forEach((i)=>{
            if(i!==""){
                ls.push(i)
            }
        });
        slash = ls ;

        if(slash[slash.length-1]==="add_object"){
            this.obj_pere = null;
        }
        else{
            this.obj_pere = slash.pop();
        }


        this.state = {
            pere:{},
            types:[],
            pere_valid:false,
            msg:""
        }
        if(this.obj_pere!==null) {
            Axios.get("http://localhost:8080/api/get_one_object_line?_id="+this.obj_pere).then((res) => {
                if(res.data.length>0) {
                    this.setState({pere: res.data[0],pere_valid:true})

                    console.log(res.data[0]);
                }
                else{
                    this.obj_pere=null ;
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        Axios.get("http://localhost:8080/api/get_type_objects").then((res)=>{
            this.setState({types:res.data})
            console.log(res.data)

        }).catch((err)=>{console.log(err)})


    }

    render(){
        return <div className={"col-xs-12"}>

            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                Ajouter un Objet </h1>
            <div className={"interline_more"}> ajouter ici des objets à votre system de supervision  </div>
            <div className={"interline liner"}></div>

            <div className={"col-xs-12"}>
                <h3 style={{textAlign:"left"}}>Objet supérieur :</h3>
                {(!this.state.pere_valid)&&<div>l'object actuel serait sans objet supérieur </div>}

                {this.state.pere_valid&&<div className={"col-xs-12"}>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> id_pere : {this.state.pere.obj_id} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> nom physique : {this.state.pere.obj_nom_physique} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> nom logique : {this.state.pere.obj_nom_logique} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> type : {this.state.pere.obj_type} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> adress : {this.state.pere.obj_adress} </div>

                </div>}
                <div className={"col-xs-12 interline"}></div>
                <h3 style={{textAlign:"left"}}>Objet actuel :</h3>


                <div className={"col-xs-12"} style={{fontSize:"120%"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input id={"nom_log"} type={"text"} className={"my_text_box_v2"} placeholder={"nom logique de l'objet"} />
                </div> </div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input id={"nom_phy"} type={"text"} className={"my_text_box_v2"} placeholder={"nom physique de l'objet"} />
                </div> </div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input  id={"adress"} type={"text"} className={"my_text_box_v2"} placeholder={"adress de l'objet "} />
                </div> </div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <select id={"type"} className={"my_text_box_v2"} defaultValue={""}>

                        <option value="" disabled  >type de l'objet</option>
                        {
                            this.state.types.map((i)=>{
                                return <option value={i} key={i}> {i} </option>
                            })
                        }

                    </select>
                </div> </div>

                <div className={"col-xs-12 interline_more"} style={{marginTop:"60px"}}>{this.state.msg}</div>

                <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"60px",paddingBottom:"10px"}}> <div className={"col-xs-offset-3 col-xs-6"}>
                    <input type={"button"} className={"my_button_v2"} value={"INSERER OBJET"} onClick={(()=>{

                        let nom_log = document.querySelector("#nom_log").value ;
                        let nom_phy = document.querySelector("#nom_phy").value;
                        let adress = document.querySelector("#adress").value ;
                        let type = document.querySelector("#type").value ;
                        console.log(this.obj_pere,nom_log,nom_phy,adress,type);
                        if((nom_phy!=="")&&(nom_log!=="")&&(adress!=="")&&(type!=="")){
                            console.log("fire")
                            Axios.post("http://localhost:8080/api/post_object", querystr.stringify({

                                obj_pere: this.obj_pere,
                                obj_nom_phy: nom_phy,
                                obj_nom_log:nom_log,
                                obj_adress:adress,
                                obj_type:type

                            }), {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then((res)=>{
                                console.log(res.data);
                                console.log(res.data.status)
                                if(res.data.status){
                                    window.location.pathname="/"
                                }
                                else{

                                }
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }
                        else{
                            this.setState({msg:"des parametres sont invalides ou vides"})
                        }


                      //  Axios.post("http://localhost:8080/api/post_object")

                    })} />
                </div> </div>

                <div className={"col-xs-12 interline_more"}></div>


                <div className={"col-xs-12 interline liner"}></div>



            </div>


        </div>
    }
}

export default add_object ;