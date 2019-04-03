import React,{Component} from 'react';
import {
    Form, Input, Tooltip, Icon, Button,
} from 'antd';
import '../login/index.less'
import logo from "../../assets/images/logo.png";

const Item = Form.Item;
@Form.create()
 class Login extends Component{
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    login = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((errors, values)=>{
            if(!errors){
                console.log(values);
            } else {
                console.log(errors);
            }
        })
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        const length = value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else if (!value){
            callback('必须输入用户密码');
        } else if (length<4){
            callback('用户密码必须大于4位');
        } else if (length>12) {
            callback('用户密码必须小于12位');
        } else if (!pwdReg.test(value)){
            callback('用户密码必须是英文、数组或下划线组成');
        }
        else {
            callback();
        }
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        const length = value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        } else if (!value){
            callback('必须输入用户密码');
        } else if (length<4){
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
      const {getFieldDecorator} =this.props.form;
      return (
          <div className="login">
              <header className="login-header">
                  <img src={logo} alt="logo"/>
                  <h1>React项目: 后台管理系统</h1>
              </header>
              <section className="login-content">
                  <h3>用户注册</h3>
                  <Form onSubmit={this.login} className="login-form">
                      <Item  label={(<span>用户名&nbsp;
                              <Tooltip title="这是你的昵称">
                               <Icon type="question-circle-o" /></Tooltip></span>)}>
                          {getFieldDecorator('userName', {
                              rules: [
                                  {required: true, whiteSpace: true, message: '必须输入用户名'},
                                  {min: 4,message: '用户名必须大于4位'},
                                  {max: 12, message: '用户名必须小于12位'},
                                  {patten: /^[a-zA-Z0-9_]+$/, message:'用户名必须是英文、数组或下划线组成'}
                                  ],
                          })(
                              <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                          )}
                      </Item>
                      <Item label="密码">
                          {getFieldDecorator('password', {
                              rules: [{
                                  validator: this.validateToNextPassword,
                              }],
                          })(
                              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                          )}
                      </Item>
                      <Item label="确认密码">
                          {getFieldDecorator('password', {
                              rules: [{
                                  validator: this.compareToFirstPassword,
                              }],
                          })(
                              <Input prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} onBlur={this.handleConfirmBlur} type="password" placeholder="确认密码" />
                          )}
                      </Item>
                      <Item label="E-mail">
                          {getFieldDecorator('email', {
                              rules: [{
                                  type: 'email', message: '这不是正确的邮箱格式!',
                              }, {
                                  required: true,whiteSpace: true, message: '请输入你的邮箱!',
                              }],
                          })(
                              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="email" />
                          )}
                      </Item>
                      <Item>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                              注册
                          </Button>
                      </Item>
                  </Form>
              </section>
          </div>
      )
  }
}
export default Login