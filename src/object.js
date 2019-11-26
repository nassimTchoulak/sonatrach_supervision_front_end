import React from 'react' ;
import {transform} from "./login_api";
import Axios from 'axios'
import Line from './object_line'
class Objects extends  React.Component{
    constructor(props){
        super(props);
    if(localStorage.getItem("token")===null){
        window.location.pathname="/login"
    }
    this.state = {
        objects:[]
    }
    }


    componentDidMount(){
        Axios.get("http://localhost:8080/api/get_all_objects").then((res)=>{


            let ls = transform(res.data) ;
            
            console.log(ls);
            this.setState({objects:ls}) ;

        }).catch((err)=>{
            console.log(err)
        })
    }
    componentWillUnmount() {
    }

    render() {
        return (<div className={"col-xs-12"}>

            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                Mes Objects </h1>
            <div className={"interline_more"}> trouvez Tout vous objets organisés de manière hièrchique </div>

            <div className={"col-xs-12 interline liner "}></div>
            <h3 style={{textAlign:"left"}}>Organisation :</h3>

            <div className={"col-xs-12"}>
                <div className={"item_object"}>
                    nom objet physique
                </div>

                <div  className={"item_object"}>
                    nom objet logique
                </div>
                <div  className={"item_object"}>
                    type de l'objet
                </div>
                <div  className={"item_object"}>
                    adress de l'objet
                </div>
            </div>

            <div className={"col-xs-12 interline  "}></div>
            {
                this.state.objects.map((i)=>{
                    return <Line {...i}  key={i.obj_id } />
                })
            }
            <div className={"col-xs-12 interline"}  style={{fontSize:"120%",marginTop:"100px"}}> </div>


        </div>)
    }


}

export default Objects ;