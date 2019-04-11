import React,{Component} from 'react';
import {Route,Redirect,Switch }from 'react-router-dom';
import Bar from "./bar";
import Line from "./line";
import Pie from "./pie";

export default class Charts extends Component{
    render() {
        return (
            <Switch>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to="/charts/bar"/>
            </Switch>
        )
    }
}