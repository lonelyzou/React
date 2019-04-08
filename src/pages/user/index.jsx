import React, { Component } from 'react';
import MyBtn from '../../components/myButton/index'
import {Button, Card, Table, Select, Form, message, Modal} from "antd";
import dayjs from "dayjs";
import { reqUserList, reqAddUser } from '../../api/index'
import AddUserForm from "./Add-user-form";

const Option = Select.Option;
const Item = Form.Item
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity:1,
            users: [], //用户数组
            roles: [], //所属角色数组
            isShowAddUserModal: false, //是否展示创建用户的标识
        };
        this.AddUserForm = React.createRef();
    }
    //定义列
    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            width:'15%',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            width:'20%',
        }, {
            title: '电话',
            width:'15%',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            width:'25%',
            render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '所属角色',
            width:'10%',
            dataIndex: 'role_id',
            render: role_id => this.state.roles.find(item => item._id === role_id).name
        },
        {
            title: '操作',
            render: () => <span><MyBtn>修改</MyBtn><MyBtn style={{marginLeft:"15px"}}>删除</MyBtn></span>,
        }];
    //获取用户列表
    getUserList = async ()=>{
        const result = await reqUserList();
        console.log(result);
        if(result.status === 0){
            message.success('获取用户列表成功')
            this.setState({
                users: result.data.users,
                roles: result.data.roles,
            })
        } else{
           message.error('获取用户列表失败')
        }
    }
    //发送请求获取数据
    componentDidMount() {
        this.getUserList();
    }
    //新增用户
    addUser = async ()=>{
        const { validateFields } = this.AddUserForm.current.props.form;
        validateFields(async (errors,values)=>{
            if(!errors){
                const result =await reqAddUser(values.username,values.password ,values.phone ,values.email ,values.role_id);
                if( result.status === 0 ){
                   message.success('添加成功') ;
                   console.log(result)
                   this.setState({
                       users:[...this.state.users,result.data],
                       isShowAddUserModal: false, //是否展示创建用户的标识
                   })
                } else {
                    message.error('添加失败')
                }
            } else {

            }
        })
    }
    render() {
        const {users,roles,isShowAddUserModal} = this.state;

            return (
                <Card
                    title={<Button type="primary" onClick={() => this.setState({isShowAddUserModal:true})}>创建用户</Button> }
                    style={{ width: "100%"}}>
                    <Table
                        columns={this.columns}
                        dataSource={users}
                        bordered
                        pagination={{
                            showSizeChanger: true,
                            pageSizeOptions:['3','6','9','12'],
                            defaultPageSize: 3,
                            showQuickJumper:true,
                        }}
                        rowKey="_id"
                    />
                    <Modal
                        title="创建用户"
                        visible={isShowAddUserModal}
                        onOk={this.addUser}
                        onCancel={() => this.setState({isShowAddUserModal:false})}
                        okText="确认"
                        cancelText="取消"
                    >
                        <AddUserForm roles={roles} users={users}  wrappedComponentRef={this.AddUserForm}/>
                    </Modal>
                </Card>
            )
    }
}
export default User