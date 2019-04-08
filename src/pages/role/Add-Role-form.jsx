import React,{Component} from "react";
import { Form, Input,  Select} from "antd";
import PropTypes from 'prop-types'
const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class AddRoleForm extends Component{
    static propTypes = {
        roles: PropTypes.array.isRequired,
    }
    //用户名规则
    nameValidator =(rule, value, callback)=>{
        const { roles } = this.props;
        const rolesName = roles.find(( item )=> value === item.name );
        if(!value){
            callback("请输入要修改的角色名称，不能为空")
        } else if(rolesName){
            callback('不能与之前角色名称相同');
        }  else{
            callback();
        }
    }

    render() {
        const { form : { getFieldDecorator }} = this.props;
        return (
            <Form>
                <Item label="角色名称" labelCol={{span: 6}}  wrapperCol={{span: 15}}>
                    {getFieldDecorator('name', {
                        rules: [ {validator: this.nameValidator }],
                    })(
                        <Input placeholder="请输入角色名称" />
                    )}
                </Item>
            </Form>
        )
    }
}
export default AddRoleForm;