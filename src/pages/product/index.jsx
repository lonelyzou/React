import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Index from './index/index';
import SaveUpdate from './save-update/save-update';
import Detail from './detail/detail'
export default class Products extends Component{
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={Index}/>
                <Route path="/product/saveupdate" component={SaveUpdate}/>
                <Route path="/product/detail" component={Detail}/>
                <Redirect to="/product/index"/>
            </Switch>
        )
    }
}