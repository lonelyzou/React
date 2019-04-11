import React,{Component} from "react";
import { Form, Input,Tree } from "antd";
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'
import memory from "../../utils/memory-utils";

const Item = Form.Item;
const { TreeNode } = Tree;
@Form.create()
class UpdateRoleForm extends Component{
    static propTypes = {
        role: PropTypes.object.isRequired,
        ChangeRole: PropTypes.func.isRequired
    }
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    })
    onCheck = (checkedKeys) => {
        // console.log('onCheck', checkedKeys);
        this.props.ChangeRole(checkedKeys)
    }
    render() {
        const { form : { getFieldDecorator },role:{name,menus}} = this.props;
        return (
            <Form>
                <Item label="角色名称" labelCol={{span: 4}}  wrapperCol={{span: 20}}>
                    {getFieldDecorator('name', {
                        initialValue:name
                    })(
                        <Input placeholder="请输入角色名称" disabled/>
                    )}
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={menus}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="0-0">
                        {this.renderTreeNodes(menuList)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
export default UpdateRoleForm;