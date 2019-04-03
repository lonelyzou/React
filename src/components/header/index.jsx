import React, { Component } from 'react';
import { Row, Col, Modal, message ,Avatar} from 'antd';
import {withRouter} from 'react-router-dom'
import MyBtn from '../myButton/';
import memory from '../../utils/memory-utils'
import dayjs from 'dayjs';
import {reqWeather } from '../../api';
import menuList from '../../config/menuConfig';

import './index.less';

@withRouter
class HeaderMain extends Component{
    state = {
        sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather: '小雨转晴'
    }
    componentDidMount() {
        this.time = setInterval(() =>{
            this.setState({
                sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            })
        },1000)
        //请求天气数据
        reqWeather('深圳')
            .then(res =>{
                this.setState({
                    weatherImg:res.weatherImg,
                    weather:res.weather
                })
            })
            .catch(err => message.error(err, 2))
    }
    componentWillUnmount() {
        clearInterval(this.time)
    }
    getTitle = () => {
        const { pathname } = this.props.location;
        for (let i=0,length = menuList.length;i<length;i++) {
          const menu = menuList[i];
          const children = menu.children;
            if(children){
              for(let j=0,length = children.length;j<length;j++){
                  let item = children[j];
                  if(pathname === item.key){
                      return item.title;
                  }
              }
          } else {
              if(pathname === menu.key){
                  return menu.title;
              }
          }
        }
    }
    //退出登录提示
    logout = ()=>{
        Modal.confirm({
            title:'您确认要退出登录吗',
            onOk: () =>{
                //清空用户信息
                memory.user = { };
                this.props.history.replace('/login')
            },
            onCancel: ()=>{},
            okText: '确认',
            cancelText: '取消'
        })
    }
    render() {
        const {sysTime, weatherImg, weather} = this.state;
        const title = this.getTitle();
        const username = memory.user.username;
        return (
            <div className="header">
                <Row className="header-top">
                    <span>欢迎，{username}
                    <Avatar
                            src="https://i.loli.net/2019/04/03/5ca49a5642232.png" /></span>
                    <MyBtn onClick={this.logout}>退出</MyBtn>
                </Row>
                <Row className="header-bottom">
                    <Col className="header-main-left" span={6}> {title}</Col>
                    <Col className="header-main-right" span={18}>
                       <span>{sysTime}</span>
                        <img src={weatherImg} alt="天气"/>
                        <span>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HeaderMain