import React, {Component} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

import {reqLogin} from '../../api/index'
import { setItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';
import './index.less';
import logo from '../../assets/images/logo.png';

const Item = Form.Item;
@Form.create()
 class Login extends Component{
    login = (e)=>{
        e.preventDefault();
        //校验表单是否通过
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                //校验成功
                console.log(values);
                const {username, password} = values;
                const result =await reqLogin(username, password);
                //判断登录是否成功
                if(result.status === 0){
                    message.success('登录成功');
                    //保存用户数据
                    const data = result.data;
                    memory.user = data ;
                        setItem(data);
                    // 跳转到admin页面
                    this.props.history.replace('/');
                } else {
                    message.error(result.msg, 2)
                }
            } else {
                // 校验失败
                console.log('****** 表单校验失败 ******');
                console.log(err);
                console.log('****** 表单校验失败 ******');
            }
        })
    };
    //自定义校验
    validator = (rule, value, callback) =>{
        const length = value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if(!value){
            callback('必须输入用户密码');
        } else if(length<4){
            callback('用户密码必须大于4位');
        } else if (length>12) {
            callback('用户密码必须小于12位');
        } else if (!pwdReg.test(value)){
            callback('用户密码必须是英文、数组或下划线组成');
        } else {
            callback();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h3>用户登录</h3>
                    <Form className="login-form" onSubmit={this.login}>
                        <Item>{
                            getFieldDecorator('username',{
                                rules: [
                                    {required: true, whiteSpace: true, message: '必须输入用户名'},
                                    {min: 4,message: '用户名必须大于4位'},
                                    {max: 12, message: '用户名必须小于12位'},
                                    {patten: /^[a-zA-Z0-9_]+$/, message:'用户名必须是英文、数组或下划线组成'}
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )
                        }
                        </Item>
                        <Item >
                            {
                                getFieldDecorator('password',{
                                    rules: [
                                        { validator: this.validator }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )
                            }
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Login;