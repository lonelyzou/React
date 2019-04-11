import React,{Component} from "react";
import { Form, Input,  Select} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class UpdateUserForm extends Component{
    static propTypes = {
        roles: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
    }
    //用户名规则
    nameValidator =(rule, value, callback)=>{
        if(!value){
            callback("请输入要修改的分类名称，不能为空")
        } else{
            callback();
        }
    }
    //密码规则
    passwordValidator = (rule, value, callback) =>{
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
    //find角色名
    findRoleName =()=>{
        const {user,roles } = this.props;
        const Role = roles.find( (item)  =>{
             if(item._id === user.role_id){
                return item
             }
            return item
         })
       return Role.name
    }

    render() {
        const { form : { getFieldDecorator },user,roles } = this.props;
        return (
            <Form>
                <Item label="用户名" labelCol={{span: 6}}  wrapperCol={{span: 15}}>
                    {getFieldDecorator('username', {
                        initialValue:user.username,
                        rules: [ {validator: this.nameValidator }],
                    })(
                        <Input placeholder="请输入用户名" />
                    )}
                </Item>
                <Item label="密码" labelCol={{span: 6}}  wrapperCol={{span: 15}}>
                    { getFieldDecorator('password',{
                        initialValue:user.password,
                        rules:[{validator: this.passwordValidator}],
                    })(
                        <Input placeholder="请输入密码"  type='password'/>
                        )}
                </Item>
                <Item label="手机号" labelCol={{span: 6}}  wrapperCol={{span: 15}}>
                    { getFieldDecorator('phone',{
                        initialValue:user.phone,
                    })(
                        <Input placeholder="请输入手机号" />
                        )}
                </Item>
                <Item label="邮箱" labelCol={{span: 6}}  wrapperCol={{span: 15}}>
                    { getFieldDecorator('email',{
                        initialValue:user.email,
                    })(
                        <Input placeholder="请输入邮箱" type='email' />
                        )}
                </Item>
                <Item label="角色" labelCol={{span: 6}}  wrapperCol={{span: 15}}>
                    {  getFieldDecorator('role_id',{
                        initialValue:this.findRoleName()
                    })(
                        <Select placeholder='请选择分类'>
                            {
                                roles.map( (item)=>{
                                    return <Option value={item._id} key={item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    )
                    }
                </Item>
            </Form>
        )
    }
}
export default UpdateUserForm;