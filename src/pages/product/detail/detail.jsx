import React, { Component } from 'react';
import {Card, Icon,List } from 'antd'
import MyBtn from "../../../components/myButton";
import '../save-update/save-update.less'
import {reqGetCategoryName} from '../../../api/index'
const Item = List.Item;
export default class Detail extends Component {
    state={
        categoriesName:'商品分类：'
    }
    getCategoryName = async (pCategoryId,categoryId)=>{
        let categoriesName = '';
        if(pCategoryId === "0"){
            const result = await reqGetCategoryName(categoryId);
            categoriesName = <span>商品分类：{result.data.name}</span>
        } else {
            const pCategory = await reqGetCategoryName(pCategoryId);
            const category = await reqGetCategoryName(categoryId);
            categoriesName = <span>商品分类：{pCategory.data.name}&nbsp;<Icon type="arrow-right"/>&nbsp;{category.data.name}</span>
        }
        this.setState({
            categoriesName
        })
    }
    componentDidMount() {
    const {pCategoryId,categoryId} = this.props.location.state;
    this.getCategoryName(pCategoryId,categoryId)
}
    renderItem = (item,index)=>{
       if(index === 4){
           return <Item>商品图片：{item.map((item,index)=> <img style={{width:"10%",height:"10%"}} key={index} src={'http://localhost:5000/upload/'+item} alt="img"/>)}</Item>
       } else if(index === 5){
           return <Item>商品详情：<div dangerouslySetInnerHTML = {{ __html: item }}/></Item>
       } else {
           return <Item>{item}</Item>
       }
    }

    render() {
        const {name,desc,price,detail,imgs} = this.props.location.state;
        const data = [
          "商品名称:  "+name,
          "商品描述:  "+ desc,
           "商品价格:  "+price,
            this.state.categoriesName,
            imgs,
            detail,
        ];
        return (
            <Card title={<div className="card-title"><MyBtn onClick={()=>{this.props.history.replace("/product/index")}}><Icon type="arrow-left" className="card-icon"/></MyBtn>商品详情</div>}>
                <List
                    bordered
                    dataSource={data}
                    renderItem={this.renderItem}
                />
            </Card>
        )
    }
}