import React from "react";
import Axios from 'axios';
import querystr from 'querystring';


class add_variable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pere: {},
            priorite: "",

            ligne: "",
            order: 0,
            splitter: "",

            returned: "",
            displayed: [],
            msg:""

        }


        if (localStorage.getItem("token") === null) {
            window.location.pathname = "/login"
        }
        let slash = this.props.location.pathname.split("/");
        this.obj_pere = slash.pop();

        Axios.get("http://localhost:8080/api/get_one_object_line?_id=" + this.obj_pere).then((res) => {
            if (res.data.length > 0) {
                this.setState({pere: res.data[0]})

                console.log(res.data[0]);
            } else {
                this.obj_pere = null;
            }
        }).catch((err) => {
            console.log(err);
        })


    }

    each = ((min) => {
        if (this.state.priorite === "") {
            return "_"
        } else {
            let val = this.state.priorite;
            if (!min) {
                return val * val * val * 10
            } else {
                return Math.floor((val * val * val * 10) / 60)
            }
        }
    });
    calculated_value = () => {
        try {
            let within_line = this.state.displayed[this.state.ligne];
            let char;
            let value = 0;

            console.log("line",within_line);

            if ((this.state.splitter === "")) {
                    return within_line.replace(" ", "") ;
            }
            else { // if splitter is on
                let ls = within_line.split(this.state.splitter);
                let ls2 = [];
                ls.forEach((i) => {
                    if (i !== "") {
                        ls2.push(i);
                    }
                });
                char = ls2[this.state.order];
            }

            char = char.replace(" ", "");

            return char ;
        }
    catch(e) {
        return "error"
    }
}

    number_change_ligne = event =>{
        if(!isNaN(event.target.value)){
            this.setState({ligne:event.target.value})
        }
    };

    number_change_order = event =>{
        if(!isNaN(event.target.value)){
            this.setState({order:event.target.value})
        }
    };

    test_cmd = () =>{
        if(document.querySelector("#var_exec").value===""){return 0 }

        Axios.post("http://localhost:8080/api/test_cmd", querystr.stringify({

            user_id: localStorage.getItem("token"),
            cmd:document.querySelector("#var_exec").value

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            this.setState({returned:res.data})
            let ls = res.data.split("\n")
            this.setState({displayed:ls})
            console.log(ls)

        }).catch((err)=>{
            console.log(err)
        })

    }

    insert_variable = ()=>{
       let token = localStorage.getItem("token") ;
       let obj_id = this.state.pere.obj_id ;
       let nom = document.querySelector("#var_nom").value ;
       let desc = document.querySelector("#var_description").value ;
       console.log(token,obj_id,nom,desc)
        if((nom==="")||(this.state.priorite.toString()==="")||(this.state.ligne==="")||(document.querySelector("#var_exec").value==="")){
            this.setState({msg:"des parametres manquants / non_valides"})
            return 0 ;
        }
        if((nom===undefined)||(this.state.ligne==="")||(document.querySelector("#var_exec").value===undefined)){
            this.setState({msg:"des parametres manquants / non_valides"})
            return 0 ;
        }
        if(isNaN(this.calculated_value())){
            this.setState({msg:"des parametres manquants / non_valides"})
            return 0 ;
        }

        Axios.post("http://localhost:8080/api/post_variable", querystr.stringify({

            token:token,
            obj_id:obj_id,
            var_description:desc,
            var_nom:nom,
            var_exec:document.querySelector("#var_exec").value,
            var_line:this.state.ligne,
            var_splitter:this.state.splitter,
            var_order:this.state.order.toString(),
            var_priorite:this.state.priorite.toString()

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.status) {
                window.location.pathname = "/"
            }
            else{
                this.setState({msg:"des parametres manquants / non_valides"})

            }
        }).catch((err)=>{
            console.log(err);
        })


    }


    render(){
        return <div className={"col-xs-12"}>
            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
               Ajouter une variable </h1>
            <div className={"interline_more"}> ajouter une variable à superviser automatiquement par le system </div>

            <div className={"col-xs-12 interline liner "}></div>
            <div className={"col-xs-12"}>


                <div className={"col-xs-12"}>
                    <h3 style={{textAlign:"left"}}>Objet supervisé :</h3>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> id_pere : {this.state.pere.obj_id} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> nom physique : {this.state.pere.obj_nom_physique} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> nom logique : {this.state.pere.obj_nom_logique} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> type : {this.state.pere.obj_type} </div>
                    <div className={"col-xs-12"} style={{paddingLeft:"100px",textAlign:"left"}}> adress : {this.state.pere.obj_adress} </div>

                </div>
                <div className={"col-xs-12"}>
                    <h3 style={{textAlign:"left"}}>Configuration de la variable :</h3>

                    <div className={"col-xs-12"} style={{fontSize:"120%"}}>
                        <div className={"col-xs-offset-3 col-xs-6"}>
                        <input id={"var_nom"} type={"text"} className={"my_text_box_v2"} placeholder={"nom de la variable"} />
                         </div>
                    </div>


                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}>
                        <div className={"col-xs-offset-3 col-xs-7"}>
                            <textarea id={"var_description"}  className={"textarea"} cols="60" rows="3"  placeholder={"description de la variable"} />
                        </div>
                    </div>

                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}> <div className={"col-xs-offset-3 col-xs-3"}>
                        <select id={"priorite"} className={"my_text_box_v2"} defaultValue={""} onChange={((event)=>{

                            this.setState({priorite:event.target.value})
                        })}>

                            <option value="" disabled  >priorité </option>

                            <option value={1}   >1</option>
                            <option value={2}   >2</option>
                            <option value={3}   >3</option>
                            <option value={4}   >4</option>
                            <option value={5}   >5</option>
                            <option value={6}   >6</option>
                            <option value={7}   >7</option>
                            <option value={8}   >8</option>
                            <option value={9}   >9</option>
                            <option value={10}   >10</option>

                        </select>
                    </div>
                    <div className={"col-xs-6"}>snapshot chaque {this.each(false)}s ≅ {this.each(true) }min</div>
                    </div>

                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}>
                        <div className={"col-xs-offset-3 col-xs-6"}>
                            <input id={"var_params"} type={"text"} className={"my_text_box_v2"} placeholder={"parametre optionnels"} />
                        </div>
                    </div>

                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}>
                        <div className={"col-xs-offset-3 col-xs-8"}>
                            <textarea id={"var_exec"}  className={"textarea"} style={{minHeight:"200px",fontSize:"80%",overflowX:"scroll"}} cols="60" rows="10"  placeholder={"tester votre executable .sh/.powershell ICI"} />
                        </div>
                    </div>

                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}>
                        <div className={"col-xs-offset-3 col-xs-6"}>
                            <input  type={"button"} className={"my_button_v16"} onClick={this.test_cmd} value={"  TEST EXECUTION  "} />
                        </div>
                    </div>

                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}>
                        <h4 style={{fontWeight:"bolder",textAlign:"left"}}>Resultat test</h4>

                        <div className={"col-xs-offset-2 col-xs-10 returned_value"}>
                            {this.state.displayed.map((i,itr)=>{
                                return <div key={itr} className={"col-xs-12"}>{itr}-{i}</div>
                            })}
                        </div>
                    </div>

                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"20px"}}>
                        <h4 style={{fontWeight:"bolder",textAlign:"left"}}>localisation de la valeur</h4>
                        <div className={"col-xs-offset-2 col-xs-4"}>
                            <input  type={"text"} value={this.state.ligne} onChange={this.number_change_ligne} className={"my_text_box_v2"} placeholder={"ligne résultat"} />
                            <div className={"interline"}></div>
                            <input  type={"text"} className={"my_text_box_v2"} onChange={((event)=>{
                                this.setState({splitter:event.target.value})
                            })} placeholder={"splitter dans ligne"} />
                            <div className={"interline"}></div>
                            <input  type={"text"} onChange={this.number_change_order} value={this.state.order} className={"my_text_box_v2"} placeholder={"ordre dans ligne"} />


                        </div>


                        <div className={"col-xs-offset-1 col-xs-5"}>
                            la valeur localisé : {this.calculated_value()}

                        </div>
                    </div>

                    <div className={"interline "}>{this.state.msg}</div>
                    <div className={"col-xs-12"} style={{fontSize:"120%",marginTop:"50px"}}>
                        <div className={"col-xs-offset-3 col-xs-6"}>
                            <input onClick={this.insert_variable} type={"button"} className={"my_button_v2"} value={"  INSERER VARIABLE  "} />
                        </div>
                    </div>


                    <div className={"col-xs-12 interline"}  style={{fontSize:"120%",marginTop:"100px"}}> </div>


                </div>
            </div>




        </div>
    }


}
export default add_variable ;