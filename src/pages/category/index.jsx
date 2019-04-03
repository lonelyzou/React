import React, { Component } from 'react';
import {Card, Table, Icon, Button, Pagination, Modal, Form, Select, Input, message} from 'antd';
import MyBtn from '../../components/myButton/index'
import { reqAddCategory, reqCategory, reqUpdateCategory } from '../../api/index'

const { Option } = Select;
export default class Category extends Component {
 state = {
   categories: [],  //保存所有一级分类数据
   subCategories: [], //保存所有二级分类数据
   category: {}, //保存当前选中单个分类数据
 }
 //获取列表数据的方法
  getCategories = async (parentId)=>{
    // 发送请求
    const result = await reqCategory(parentId)
    if(result.status === 0){
       message.success('获取数据成功');
      //parentId === 0 ：一级列表
      if(parentId === 0){
        this.setState({
          categories:result.data
        })
      } else {
        this.setState({
          subCategories:result.data
        })
      }
    } else {
      message.error('获取分类列表数据失败')
    }

  }
//添加分类的方法
  addCategory = async () =>{
    const { parentId,categoryName } = this.form.getFieldsValue();
    const result = await reqAddCategory(parentId,categoryName);
    if(result.status === 0){
      message.success('添加分类成功')
    } else {
      message.error('添加分类失败')
    }
  }
//修改分类名称
  updateCategoryName = async () =>{
    const {categoryName } = this.form.getFieldValue();
    //获取修改前的名称
    const {_id,name} = this.state.category;
    if( name === categoryName){
        message.warn('请输入修改名称')
    } else {
      const result = await reqUpdateCategory(_id,categoryName);
      if(result.status === 0){
        message.success('修改成功')
      } else {
        message.error('修改失败')
      }
    }

  }

   confirm = () => {
    Modal.confirm({
      title: '添加分类',
      content: '',
      okText: '确认',
      cancelText: '取消',
    });
  }
   render() {
    const columns = [{
      title: '品类名称',
      dataIndex: 'name',
    }, {
      title: '操作',
      width:'300px',
      dataIndex: 'operator',
      render: text =><div>
        <MyBtn>修改名称</MyBtn>
        <MyBtn>查看其子品类</MyBtn>
       </div>
    }];

    const data = [ {
      key: '1',
      name: '手机',
    },
      {
        key: '2',
        name: '电脑',
      },
      {
        key: '6',
        name: '电脑',
      },
      {
        key: '3',
        name: '电脑',
      },
      {
        key: '4',
        name: '电脑',
      },
      {
        key: '5',
        name: '电脑',
      }];
    return (
          <Card title="品类管理" extra={<Button type="primary" onClick={confirm}><Icon type="plus"/>添加品类</Button>
          } style={{ width: "100%" }}>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions:['3','6','9','12'],
                  defaultPageSize: 3,
                  showQuickJumper:true
                }}
            />
          </Card>
    )
  }
}

//添加分类的组件
class AddFrom extends Component {
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
  render() {
    return (

        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item label="Gender">
                <Select
                    placeholder=""
                    onChange={this.handleSelectChange}
                >
                  <Option value="male">一级分类</Option>
                  <Option value="female">female</Option>
                </Select>
            )}
          </Form.Item>
          <Form.Item label="Note">
            <Input placeholder="请输入分类名称"/>
          </Form.Item>
        </Form>
    )
  }
}


