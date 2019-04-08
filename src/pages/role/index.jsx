import React, { Component } from 'react';
import {Card,Button,Table,Radio,Modal, message} from 'antd';
import dayjs from "dayjs";
import { reqRoleList ,reqAddRole} from '../../api/index'
import AddRoleForm from "./Add-Role-form";
import UpdateRoleForm from "./Update-Role-form";
const RadioGroup = Radio.Group;
export default class Role extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:'', //单选的默认值，也就是选中的某个角色的id值
            roles:[], //存储角色列表
            isDisabled: true,  //控制设置角色权限按钮的标识
            role:{},//当前被选中的值
            isShowAddRoleModal:false, //显示创建角色面板
            isShowUpdateRoleModal:false //显示设置权限面板
        }
        this.AddRoleForm = React.createRef()
    }
  componentWillMount() {
    //定义列
    this.columns = [
        {
            dataIndex: '_id',
            width: "15%",
            render: id => <Radio value={id}/>,
        },
        {
            title: '用户名',
            dataIndex: 'name',
            width: "17%"
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            width: "25%",
            render: (time) => (
                dayjs(time).format('YYYY-MM-DD HH:mm:ss')
            ),
        }, {
            title: '授权时间',
            dataIndex: 'auth_time',
            width: "25%",
            render: time => time && dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        }];
}

  //radio状态改变时触发的函数
    onRadioChange = (e)=>{
        const role = this.state.roles.find(item => item._id ===e.target.value)
        this.setState({
            value: e.target.value,
            isDisabled: false,
            role,
        })
    }


    //获取角色列表函数
    getRoleList =async ()=>{
        const result =await reqRoleList()
        if(result.status === 0){
            message.success("获取角色列表成功");
            this.setState({
                roles:result.data
            })
        }else {
            message.success("获取角色列表失败")
        }
    }
    //调用角色列表函数
    componentDidMount() {
        this.getRoleList();
    }
    //创建角色函数
    AddRole = ()=>{
        const {validateFields} = this.AddRoleForm.current.props.form;
        validateFields (async (errors,values)=>{
          if(!errors){
              const result =await reqAddRole(values.name)
              if(result.status === 0 ){
                  message.success("角色添加成功");
                  this.setState({
                      roles:[...this.state.roles,result.data],
                      isShowAddRoleModal:false
                  })
              }else{
                  message.error("角色添加失败")
              }
          }
        } )
    }
    //设置角色权限
    UpdateRole =()=>{
        this.setState({isShowAddRoleModal:false})
    }
    render() {
        const {roles,isDisabled,value,isShowAddRoleModal,isShowUpdateRoleModal,role} = this.state;
        return (
            <Card
                title={<div><Button type="primary" onClick={() => this.setState({isShowAddRoleModal:true})}>创建角色</Button>
                    &nbsp;&nbsp; <Button type="primary" disabled={isDisabled} onClick={() => this.setState({isShowUpdateRoleModal:true})}>设置角色权限</Button></div>}
                style={{ width: "100%"}}
            >
                <RadioGroup style={{width: '100%'}} onChange={this.onRadioChange} value={value}>
                    <Table
                        columns={this.columns}
                        dataSource={roles}
                        bordered
                        rowKey='_id'
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '15', '20'],
                            showQuickJumper: true,
                        }}
                    />
                </RadioGroup>
                <Modal
                    title="创建角色"
                    visible={isShowAddRoleModal}
                    onOk={this.AddRole}
                    onCancel={() => this.setState({isShowAddRoleModal:false})}
                    okText="确认"
                    cancelText="取消"
                >
                    <AddRoleForm roles={roles} wrappedComponentRef={this.AddRoleForm}/>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowUpdateRoleModal}
                    onOk={this.UpdateRole}
                    onCancel={() => this.setState({isShowUpdateRoleModal:false})}
                    okText="确认"
                    cancelText="取消"
                >
                    <UpdateRoleForm name={role.name}/>
                </Modal>
            </Card>
        )
    }
}