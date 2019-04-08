import React, { Component } from 'react';
import MyBtn from '../../components/myButton/index'
import {Button, Card, Icon, Modal, Table,Select,Input,Form,Cascader,InputNumber} from "antd";
import SaveUpdate from './save-update'
const Option = Select.Option;
const Item = Form.Item
@Form.create()
class Product extends Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',

        };
    }
    getProductList = ()=>{

    }
    AddProducts = ()=>{
        // this.props.history.replace("/product/saveupdate")
    }
  render() {
    const columns = [
        {
      title: '商品名称',
      dataIndex: 'name',
      width:'25%',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '商品描述',
      dataIndex: 'description',
      width:'25%',
    }, {
      title: '价格',
      width:'16%',
      dataIndex: 'price',
    },
      {
        title: '状态',
        dataIndex: 'two',
        width:'16%',
        render: () => <span><Button type="primary">上架</Button><span style={{marginLeft:"15px"}}>已上架</span></span>,
      },
      {
        title: '操作',
        width:'300px',
        render: () => <span><MyBtn>详情</MyBtn><MyBtn style={{marginLeft:"15px"}}>修改</MyBtn></span>,
      }];
    const data = [
        {
      key: '1',
      name: 'John Brown',
      description: '￥300,000.00',
      price: '￥300,000.00',
    },{
        key: '1',
        name: 'John Brown',
        description: '￥300,000.00',
        price: '￥300,000.00',
    }];
    const { opacity , formLayout } = this.state;
      if(opacity === 0){
          return (
             <SaveUpdate/>
          )
      } else {
          return (
              <Card
                  title={ <span>
                         <Select defaultValue="one"  style={{ width: '13%' ,marginRight:"10px"}}>
                           <Option value="one">根据商品描述</Option>
                           <Option value="two">根据商品名称</Option>
                         </Select>
                         <Input type="text"  style={{ width: '15%', marginRight: '3%' }} placeholder="关键字"/>
                         <Button type="primary" htmlType="submit" style={{ width:'5%'}}>搜索</Button>
                        </span> }
                  extra={<Button type="primary" onClick={this.AddProducts}><Icon type="plus"/>添加产品</Button> }
                  style={{ width: "100%"}}>
                  <Table
                      columns={columns}
                      dataSource={data}
                      bordered
                      pagination={{
                          showSizeChanger: true,
                          pageSizeOptions:['3','6','9','12'],
                          defaultPageSize: 3,
                          showQuickJumper:true,

                      }}
                      rowKey="_id"
                  />
              </Card>
          )
      }
  }
}
export default Product