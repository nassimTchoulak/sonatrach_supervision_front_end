import React from "react";
import querystr from 'querystring';
import Axios from 'axios' ;
import './my_ui.css';
import Path from './path'

class alertes extends React.Component{

    constructor(props) {
        super(props);
        if(localStorage.getItem("token")===null){
            window.location.pathname="/login"
        }
        this.state = {
            alertes : [],
            views:{}
        }
        this.cle ="" ;


    }
    update =(first=false)=>{
        Axios.get("http://localhost:8080/api/get_critics_all").then((res)=>{
            let y = {}
            if(first) {
                res.data.forEach((i) => {
                    y[i.var_id + i.niveau.toString()] = false;
                })

                this.setState({view: y})
            }
            this.setState({alertes:res.data})
        })
    }
    componentDidMount() {
        this.cle = setInterval(this.update,3000);
        this.update(true)
    }
    componentWillUnmount() {
        clearInterval(this.cle)
    }
    date_correction= (str)=>{
        let d = new Date(str) ;
        return d.toLocaleString('en-GB') ;
    }


    render(){
        return <div className={"col-xs-12"}>
            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
               Mes Alertes actuel </h1>
            <div className={"interline_more"}> trouvez ici les alertes emises par les alarmes du system de supervision
            en temps réel </div>
            <div className={"interline liner"}></div>

            <h3 style={{textAlign:"left"}}>Organisation Alertes : </h3>

            <div className={"col-xs-12"} style={{textAlign:"left"}}>

                <div className={"item_object"}>
                    id variable :
                </div>
                <div className={"item_object"}>
                    nom de la variable :
                </div>

                <div  className={"item_object"}>
                    niveau alerte :
                </div>
                <div  className={"item_object"}>
                    rencontré à :
                </div>

            </div>
            <div className={"col-xs-12 interline"}></div>



            {this.state.alertes.map((i)=> {

                return <div className={"col-xs-12"} key={i.var_id+i.niveau.toString()}>
                <div  className={"col-xs-12 line_object"} style={{fontSize: "90%", fontWeight: "bold"}}>

                    <div className={"item_object col-xs-2"}>
                        {i.var_id}
                    </div>
                <div className={"item_object col-xs-2"}>
                    {i.var_nom}
                </div>

                <div className={"item_object col-xs-1"}>
                    {i.niveau}
                </div>

                <div className={"item_object col-xs-2"}>
                    { this.date_correction(i.last_alerte) }

                </div>
                    <div  className={"item_object "} style={{marginLeft:"50px"}}>
                        <input type={"button"} className={"my_button_v16"} value={" localiser Objet "} onClick={(()=>{
                            let rt = this.state.view ;
                            rt[i.var_id+i.niveau.toString()] = ! rt[i.var_id+i.niveau.toString()]
                            this.setState({view:rt})
                        })} />
                    </div>

                    <div  className={"item_object"} style={{marginLeft:"50px"}}>
                        <input type={"button"} className={"my_button_v16"} value={" archiver alerte "} onClick={(()=>{

                            Axios.post("http://localhost:8080/api/archive_alertes", querystr.stringify({var_id: i.var_id}), {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then((res)=>{
                                console.log(res)
                                setTimeout(this.update,200);
                            }).catch((err)=>{
                                console.log(err);
                            })

                        })} />
                    </div>
                    </div>

                    {this.state.view[i.var_id+i.niveau.toString()]&&<Path _id={i.obj_id}/>}


                    </div> }) }

            {(this.state.alertes.length===0)&&<h1>NO ALERTES NOW</h1>}

        </div>


    }


}


export default alertes;