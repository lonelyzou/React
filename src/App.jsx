import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

import Login from './pages/login';
import Admin from './pages/admin';
import './assets/less/reset.less';
export default class App extends Component{
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" compontent={Admin}/>
                {/* 为了开发login组件设计的 */}
                <Redirect to="/login"/>
            </Switch>
        )
    }
}