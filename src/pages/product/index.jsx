import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom'
import MyBtn from '../../components/myButton/index'
import {Button, Card, Icon, Table,Select,Input,Form,message} from "antd";
import {reqProductList} from '../../api/index'
const Option = Select.Option;
@Form.create()
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:[], //  单页数据
            total:0    //
        };
    }
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width:'25%',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '商品描述',
            dataIndex: 'desc',
            width:'25%',
        }, {
            title: '价格',
            width:'16%',
            dataIndex: 'price',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width:'16%',
            render: () => <span><Button type="primary">上架</Button><span style={{marginLeft:"15px"}}>已上架</span></span>,
        },
        {
            title: '操作',
            width:'300px',
            render: () => <span><MyBtn>详情</MyBtn><MyBtn style={{marginLeft:"15px"}}>修改</MyBtn></span>,
        }];
    getProductList = async (pageNum, pageSize = 3)=>{
        const result = await reqProductList(pageNum,pageSize) ;
        console.log(result)
        if(result.status === 0) {
            this.setState({
                product: result.data.list,
                total: result.data.total
            })
        } else {
            message.error('')
        }

    }
    componentDidMount() {
        this.getProductList(1)
    }

  render() {
    const {product, total} = this.state;
          return (
              <Card
                  title={ <Fragment>
                         <Select defaultValue="one" value={0}>
                           <Option value={0} key={0}>根据商品描述</Option>
                           <Option value={1} key={1}>根据商品名称</Option>
                         </Select>
                         <Input type="text"  style={{ width: '15%', margin: '0 10px' }} placeholder="关键字"/>
                         <Button type="primary">搜索</Button>
                        </Fragment> }
                  extra={<Link to="/product/saveupdate"><Button type="primary"><Icon type="plus"/>添加产品</Button> </Link>}
                  style={{ width: "100%"}}>
                  <Table
                      rowKey="_id"
                      columns={this.columns}
                      dataSource={product}
                      bordered
                      pagination={{
                          showSizeChanger: true,
                          pageSizeOptions:['3','6','9','12'],
                          defaultPageSize: 3,
                          showQuickJumper:true,
                          total:total,
                          onChange:this.getProductList,
                          onShowSizeChange:this.getProductList
                      }}
                  />
              </Card>
          )
  }
}
export default Product