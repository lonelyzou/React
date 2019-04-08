import React,{Component} from "react";
import { Form, Input } from "antd";
import PropTypes from 'prop-types'


const Item = Form.Item;
@Form.create()
class UpdateRoleForm extends Component{
    static propTypes = {
        name: PropTypes.string.isRequired,
    }
    render() {
        const { form : { getFieldDecorator },name} = this.props;
        return (
            <Form>
                <Item label="角色名称" labelCol={{span: 4}}  wrapperCol={{span: 20}}>
                    {getFieldDecorator('name', {
                        initialValue:name
                    })(
                        <Input placeholder="请输入角色名称" disabled/>
                    )}
                </Item>
            </Form>
        )
    }
}
export default UpdateRoleForm;