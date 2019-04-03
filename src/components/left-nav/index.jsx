import React, { Component , Fragment} from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig';
import logo from "../../assets/images/logo.png";
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

// 装饰器 --> 向外暴露  withRouter(LeftNav) 生成新组建
// withRouter作用：给非路由组件传递路由组件三个属性（history、location、match）
@withRouter
 class LeftNav extends Component{
    static propTypes = {
        opacity: PropTypes.number.isRequired
    }
    constructor(props) {
        super(props);
        const openKeys =[];
        this.menu = this.createMenu(menuList,openKeys);
        this.state = {
            openKeys
        }
    }

    createItem (item) {
        return (
            <Item key={item.key}>
                <Link to={item.key}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                </Link>
            </Item>
        )
    }
    createMenu(menuList,openKeys){
        const { pathname } = this.props.location;
        return menuList.map((menu)=>{
            const children = menu.children;
            if(children){
                return (
                    <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}>
                        {
                           children.map((item)=>{
                               if(item.key === pathname){
                                   openKeys.push(menu.key);
                               }
                                return this.createItem(item)
                            })
                        }
                    </SubMenu>
                )
            } else {
               return this.createItem(menu)
            }
        })
    }
    openChange = (openKeys)=>{
        this.setState({
            openKeys
        })
    }
    handleClick = ()=>{
        this.setState({
            openKeys: []
        })
    }
    render() {
        const { pathname } = this.props.location;
        const {opacity} = this.props;
        return (
            <Fragment>
                <Link className="logo" to="/home" onClick={this.handleClick}>
                    <img src={logo} alt="logo"/>
                    <h1 style={{opacity}}>硅谷后台</h1>
                </Link>
                <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.openChange}>
                    {
                        this.menu
                    }
                </Menu>
            </Fragment>
        )
    }
}
export default LeftNav;