import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom'
import MyBtn from '../../../components/myButton'
import {Button, Card, Icon, Table,Select,Input,Form,message} from "antd";
import {reqProductList,reqUpdateStatus,reqSearch} from '../../../api'
const Option = Select.Option;
@Form.create()
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:[], // 单页数据
            total:0,    // 产品总数量
            searchType:'productName',
            pageNum: 1,
            pageSize:3
        };
        this.searchContentInput = React.createRef()
    }
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width:'25%',
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
            // dataIndex: 'status',
            width:'16%',
            render: product => {
                const {_id,status} = product;
                if(status === 1){
                    return (
                        <span><Button type="primary" onClick={()=> this.updateStatus(_id,status)}>上架</Button>&nbsp;&nbsp;&nbsp;已下架</span>
                    )
                } else {
                    return (
                        <span><Button type="primary" onClick={()=> this.updateStatus(_id,status)}>下架</Button>&nbsp;&nbsp;&nbsp;在售</span>
                    )
                }
                //
            }
        },
        {
            title: '操作',
            width:'300px',
            render: (product) => <span><MyBtn onClick={this.productMessage(product)}>详情</MyBtn><MyBtn style={{marginLeft:"15px"}}onClick={this.update(product)}>修改</MyBtn></span>,
        }];
    //获取单页商品数据
    getProductList = async (pageNum, pageSize = 3)=>{
        const searchContent = this.searchContent;
        let result = null
        if(searchContent){
            //按关键字搜索
            const {pageNum,pageSize,searchType} = this.state
            result = await reqSearch({[searchType]:searchContent,pageNum,pageSize}) ;
        } else {
            result = await reqProductList(pageNum,pageSize) ;  //全部数据页面
        }
        if(result.status === 0) {
            this.setState({
                product: result.data.list,
                total: result.data.total,
                pageNum,
                pageSize
            })
        } else {
            message.error('')
        }

    }
    componentDidMount() {
        this.getProductList(1)
    }
    //更新商品状态
    updateStatus = async (productId,status)=>{
        //改变状态值~
        status = status === 1 ? 2 : 1;
        const result = await reqUpdateStatus(productId,status);
        if(result.status === 0 ){
            message.success('更新状态成功');
            this.setState({
                product:this.state.product.map((item)=>{
                    if(item._id === productId){
                        item.status = status;
                    }
                    return item;
                })
            })
        }else{
            message.error(result.msg)
        }
    }
    //修改按钮跳转
    update= (product)=>{
        return ()=>{
            this.props.history.push('/product/saveupdate',product)
        }
    }
    //详情按钮跳转
    productMessage =(product)=>{
        return ()=>{
            this.props.history.push('/product/detail',product)
        }
    }

    handleSelect=(value)=>{
        this.setState({
            searchType:value
        })
    }
    search =()=>{
        this.searchContent = this.searchContentInput.current.state.value;
        this.getProductList(1)
    }
  render() {
    const {product, total} = this.state;
          return (
              <Card
                  title={ <Fragment>
                         <Select defaultValue="productName" onChange={this.handleSelect}>
                           <Option value="productName" key={0}>根据商品名称</Option>
                           <Option value="productDesc" key={1}>根据商品描述</Option>
                         </Select>
                         <Input type="text"  style={{ width: '15%', margin: '0 10px' }} placeholder="关键字" ref={this.searchContentInput}/>
                         <Button type="primary" onClick={this.search}>搜索</Button>
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