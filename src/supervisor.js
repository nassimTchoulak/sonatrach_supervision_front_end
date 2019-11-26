import React from 'react' ;

import Axios from 'axios';

import { Line } from 'react-chartjs-2';


class supervisor extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            data:[],

            count:10,
            latest:0

        }
        this.clr = "";

        this.var_id = this.props.var_id ;


    }
    render() { return <div className={"col-xs-12"} style={{marginBottom:"50px"}}>

        <div className={"col-xs-12"}>

            <Line data={ {
                labels:this.dates_values_seen(),
                datasets:[{
                    label:"les valeurs enregistrées",
                    data:this.dates_values_seen(false),
                    lineTension:0

                }]
            } }  options={{animation:{easing:"easeInOutBack",duration: 1}

            }} />
        </div>

        <div className={"col-xs-12"}>
            <div className={"col-xs-4 col-xs-offset-1"}>
                <div className={"col-xs-12"}>se déplacer dans le temps</div>
                <div className={"col-xs-6 mini_button"} onClick={(()=>{
                    if((this.state.count*(this.state.latest+1))<this.state.data.length) {

                        this.setState({latest: this.state.latest + 1})
                    }
                })} >

                    <span className="	glyphicon glyphicon-chevron-left"></span></div>


                <div className={"col-xs-6 mini_button"} onClick={(()=>{
                    if(this.state.latest>0){
                        this.setState({latest:this.state.latest-1})
                    }
                })}> <span className="	glyphicon glyphicon-chevron-right"></span></div>

            </div>

            <div className={"col-xs-4 col-xs-offset-2"}>
                <div className={"col-xs-12"}>nombre de valeurs affichées </div>
                <div className={"col-xs-3 mini_button"} onClick={(()=>{
                    this.setState({count:this.state.count+10})
                })}><span className={"glyphicon glyphicon-plus"}></span></div>
                <div className={"col-xs-6"}>nb : {this.state.count}</div>
                <div className={"col-xs-3 mini_button"} onClick={(()=>{
                    if(this.state.count>10){
                        this.setState({count:this.state.count-10})
                    }
                })}> <span className={"glyphicon glyphicon-minus"}></span></div>
            </div>

        </div>

    </div>
    }

    date_correction= (str)=>{
        let d = new Date(str) ;
        return d.toLocaleString('en-GB') ;
    }

    dates_values_seen = (dat=true)=>{
        let dates = [];
        let valuess = [] ;

        this.state.data.forEach((i,itr)=>{
            if((itr<(this.state.count  + this.state.count*this.state.latest   ))&&(itr>=this.state.count*this.state.latest)){

                dates.push(this.date_correction(i.date_time));
                valuess.push(i.valeur)

            }
        })

        valuess = valuess.reverse();
        dates = dates.reverse();
        if(dat) {
            return dates;
        }else{
            return valuess ;
        }

    }

    update = () =>{
        Axios.get("http://localhost:8080/api/snapshots?var_id="+this.var_id).then((res)=>{
            /*
            this.setState({data:res.data})
            let ls = [];
            let ls2 = []
            res.data.forEach((i)=>{
                ls.push(this.date_correction(i.date_time));
                ls2.push(i.valeur)
            })
            this.setState({labels:ls,values:ls2}) */
            this.setState({data:res.data})

        }).catch((err)=>{
            console.log(err)
        })
    }

    componentDidMount() {
        this.clr = setInterval(this.update,10000);
        this.update()

    }
    componentWillUnmount() {
        clearInterval(this.clr)
    }

}
export default supervisor ;