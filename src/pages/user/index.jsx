import React, { Component } from 'react';
import MyBtn from '../../components/myButton/index'
import {Button, Card, Table,message, Modal} from "antd";
import dayjs from "dayjs";
import { reqUserList, reqAddUser ,reqDeleteUser,reqUpdateUser} from '../../api/index'
import AddUserForm from "./Add-user-form";
import UpdateUserForm from './update-user'
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity:1,
            users: [], //用户数组
            roles: [], //所属角色数组
            isShowAddUserModal: false, //是否展示创建用户的标识
            isShowUpdateUserModal: false, //是否展示创建用户的标识
            user:{}  //保存当前选中单个分类数据,要操作分类数据
        };
        this.AddUserForm = React.createRef();
        this.updateUserForm = React.createRef();
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
            key:'operator',
            render: user =>{
               return <span><MyBtn onClick={this.showUpdateUserForm(user)}>修改</MyBtn>&nbsp;&nbsp;&nbsp;<MyBtn onClick={this.deleteUser(user)}>删除</MyBtn></span>
            }
        }];
    //获取用户列表
    getUserList = async ()=>{
        const result = await reqUserList();
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
    addUser = ()=>{
        const { validateFields ,resetFields} = this.AddUserForm.current.props.form;
        validateFields(async (errors,values)=>{
            if(!errors){
                const result =await reqAddUser(values.username,values.password ,values.phone ,values.email ,values.role_id);
                if( result.status === 0 ){
                   message.success('添加成功') ;
                   this.setState({
                       users:[...this.state.users,result.user],
                       isShowAddUserModal: false, //是否展示创建用户的标识
                   })
                    //重置表单项
                    resetFields();
                } else {
                    message.error('添加失败')
                }
            } else {

            }
        })
    }
    //修改用户
    updateUser = ()=>{
        const {validateFields,resetFields} = this.updateUserForm.current.props.form;
        validateFields(async (errors,values)=>{
            if(!errors){
                const {username,password,phone,email} = values;
                const {_id} = this.state.user;
                const result = await reqUpdateUser(username,password,phone,email,_id)
                if( result.status === 0 ){
                    console.log(result);
                    message.success('修改成功') ;
                    const {username,password,phone,email,role_id} =result.data;
                    this.setState({
                        isShowUpdateUserModal: false,
                        users: this.state.users.map((item)=>{
                            if(item._id === _id){
                                return { ...item , username,password,phone,email,role_id }
                            }
                            return item
                        })
                    })
                    //重置表单项
                    resetFields();
                } else {
                    message.error('添加失败')
                }
            }
        })
    }
    //删除用户
    deleteUser = (user)=>{
        return async ()=>{
            const userId = user._id
            const result = await reqDeleteUser(userId);
            if(result.status === 0) {
                message.success('删除成功')
                this.setState({
                    users:this.state.users.filter((item)=>{
                        if(userId !== item._id) return item
                    })
                })
            } else {
                message.error(result.msg);
            }
        }
    }
    //显示修改用户表单
    showUpdateUserForm=(user)=>{
        return()=>{
            this.setState({
                isShowUpdateUserModal: true, //是否展示创建用户的标识
                user
            })
        }

    }
    render() {
        const {users,roles,isShowAddUserModal,user,isShowUpdateUserModal} = this.state;
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

                    <Modal
                        title="修改用户"
                        visible={isShowUpdateUserModal}
                        onOk={this.updateUser}
                        onCancel={() => this.setState({isShowUpdateUserModal:false})}
                        okText="确认"
                        cancelText="取消"
                    >
                        <UpdateUserForm  user={user} roles={roles} wrappedComponentRef={this.updateUserForm}/>
                    </Modal>
                </Card>
            )
    }
}
export default User