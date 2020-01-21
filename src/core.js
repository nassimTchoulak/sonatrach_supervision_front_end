import React, {useLayoutEffect, useState} from 'react';
//import {Route ,Switch} from 'react-router';


//import { NavLink ,Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";
import  'bootstrap/dist/css/bootstrap.min.css';
import './my_ui.css';




//import Background from "./back_img_v1.jpg";

// import { Route, Redirect } from 'react-router'

const style = {
    width: "100%",
    //  backgroundSize :"cover",
    // backgroundClip: 'none',
    // backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    height: "100%",
    //backgroundColor : '#261326',
    backgroundImage:"linear-gradient(to bottom right, ##f0f0f0, ##f0f0f0)",
    //   backgroundRepeat: 'repeat',
    position: 'static',

    // backgroundImage: "linear-gradient(to top,#261326,#261326)",
    // bottom:"1000px",

};
const style2 = style ;







function App_head({ routes }) {



    return (
        <div className={"col-xs-12 zero_pad"} style={style2}>
            <div className={"col-xs-12 "} >

                <div className={"col-xs-12 holder_v8"}>


                    <NavLink to={"/real_time"} activeClassName={"active_my_button_v8"}
                             className={"col-xs-3  my_button_v8"} > Supervision   </NavLink>

                    <NavLink to={"/alertes"} activeClassName={"active_my_button_v8"}
                             className={"col-xs-3  my_button_v8"}> Mes Alertes  </NavLink>
                <NavLink to={"/"}
                         className={"col-xs-3  my_button_v8"}> Mes objets </NavLink>
                <NavLink to={"/add_object"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"}> Ajouter objet </NavLink>


                <NavLink to={'/login'} className={"col-xs-12  my_button_v8"} >Deconnecter</NavLink>

                </div>

            </div>

            <div className={"col-xs-12"}>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            </div>
        </div>
    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}

            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}


const routes = [];

/*
const routes = [
    {
        path: "/",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/",//   / means sandwich
                component: Object_mine,
                exact: true
            }]
    },

    {
        path:"/add_alarme/:var",
        component:App_head,
        exact:true ,
        routes:[
            {
                path:"/add_alarme/:val",
                component:add_alarme,
                exact:true
            }
        ]}
]; */





class core extends React.Component{


    render(){
        return (
            <Router>
                <div className={"col-xs-12 zero_pad_v2"} style={style}>


                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </div>
            </Router>
        );
    }
};

export default core ;
