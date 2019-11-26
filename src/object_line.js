import React from "react";
import './my_ui.css'


class Line extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            obj_id:this.props.obj_id,
            obj_nom_physique:this.props.obj_nom_physique ,
            obj_nom_logique:this.props.obj_nom_logique ,
            obj_type:this.props.obj_type ,
            obj_adress:this.props.obj_adress,

            children : this.props.children,

            show_child:true

            /// this.props.show
        }


    }
    render(){
        return (<div className={"col-xs-12"} style={{padding:"0px"}}>

                <div className={"col-xs-12 line_object"} style={{fontSize:"90%",fontWeight:"bold"}}>


                <div className={"item_object"}>
                    {  this.state.obj_nom_physique }
                </div>

                    <div  className={"item_object"}>
                       {  this.state.obj_nom_logique }
                    </div>
                    <div  className={"item_object"}>
                        {  this.state.obj_type }
                    </div>
                    <div  className={"item_object"}>
                        {  this.state.obj_adress }
                    </div>
                    <div  className={"item_object"} style={{marginLeft:"50px"}}>
                        <input type={"button"} className={"my_button_v16"} value={" ADD VARIABLE"} onClick={(()=>{
                            window.location.pathname="/add_variable/"+this.state.obj_id

                        })} />
                    </div>
                    <div  className={"item_object"}>
                        <input type={"button"} className={"my_button_v16"} value={" ADD OBJET"} onClick={(()=>{
                            window.location.pathname="/add_object/"+this.state.obj_id
                        })} />
                    </div>
                    <div  className={"item_object"} style={{textAlign:"right",position:"absolute",right:"5px"}}>
                        <input type={"button"} className={"my_button_v16"} value={(()=>{
                            if(this.state.show_child){
                                return " - "
                            }
                            else{
                                return " + "
                            }
                        })()+" sous-objets"} onClick={(()=>{
                            this.setState({show_child:!this.state.show_child})
                        })} />
                    </div>





                </div>


            {this.state.show_child &&<div>
                {
                    this.state.children.map((i)=> {
                        return (
                            <div  key={i.obj_id}  style={{paddingLeft: "60px", textAlign: "left"}}>
                                <Line {...i} key={i.obj_id} />
                            </div>
                        )
                        }
                    )
                }
                </div> }


        </div>



        )
    }


}

export default Line ;