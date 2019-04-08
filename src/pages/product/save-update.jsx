import React, { Component } from 'react';
import MyBtn from '../../components/myButton/index'
import {Button, Card, Icon, Input,Form,Cascader,InputNumber,message} from "antd";
import { reqCategory ,reqAddProduct} from '../../api/index';
import RichTextEditor from './rich-text';
import './save-update.less'
const Item = Form.Item ;
@Form.create()
class SaveUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [], // 级联选择器的数据数组
            product:[]   //新增商品
        };
        this.richTextEditor =React.createRef();
    }
    //调整form表单
    formItemLayout = {
        // 调整Item中label占据多少列
        labelCol: {
            xs: { span: 24 },
            sm: { span: 2},
        },
        // 调整Item的内容占据多少列
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 10 },
        },
    };
    //返回index页面
    goBack = ()=>{
       this.props.history.replace("/product/index")
    }
   // 获取列表函数
    getCategories =async (parentId)=>{
        const result = await reqCategory(parentId)
         if(result.status === 0){
             //判断是一级还是二级分类
             if(parentId === "0"){
                 //一级列表
                this.setState({
                    options: result.data.map((item) =>{
                        return {
                            label: item.name,
                            value: item._id,
                            isLeaf: false
                        }
                    })
                })
             } else {
                 //二级列表
               this.setState({
                   options: this.state.options.map((option) =>{
                       //遍历原options数组，找到与传入参数parentId一样的_id所在的对象，
                       // 然后插入一个children属性，并将二级列表作为属性值插入
                       if(parentId === option.value) {
                           option.children = result.data.map((item) =>{
                               return {
                                   label: item.name,
                                   value: item._id,
                               }
                           });
                           //去掉loading状态
                           option.loading = false;
                           option.isLeaf = true;
                       }
                       return option;
                   })
               })
             }
         } else {
             message.error(result.msg);
         }
    }
    //调用获取一级列表
    componentDidMount() {
        this.getCategories('0');
    }
    //获取二级联列表参数
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        //请求二级分类数据
        this.getCategories(targetOption.value);
    }
    //提交表单的事件
    submit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                // category[ 1,2]
                const {name ,desc,price,category} = values;
                const detail = this.richTextEditor.current.state.editorState.toHTML();
                const result = await reqAddProduct(category[0],category[1],name,price,desc,detail);
                if(result.status === 0){
                    message.success("商品添加成功");
                    this.goBack()
                } else {
                    message.error(result.msg);
                }
            } else {
                message.error(err)
            }
        })
    }
    render() {
        const { form : { getFieldDecorator }} = this.props;
            return (
                <Card title={<div className="card-title">
                            <MyBtn onClick={this.goBack}>
                               <Icon type="arrow-left" className="card-icon"/>
                            </MyBtn>添加商品</div>}
                >
                    <Form {...this.formItemLayout} onSubmit={this.submit}>
                        <Item label="商品名称">
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true,whiteSpace: true, message: '请输入商品名称',
                                }],
                            })(
                                <Input placeholder="请输入商品名称"/>
                            )}
                        </Item>
                        <Item label="商品描述">
                            {getFieldDecorator('desc', {
                                rules: [{
                                    required: true,whiteSpace: true, message: '请输入商品描述',
                                }],
                            })(<Input placeholder="请输入商品描述"/>)}
                        </Item>
                        <Item label="选择分类" wrapperCol={{ xs: { span: 24 },  sm: { span: 4},}}>
                            {getFieldDecorator('category', {
                                rules: [{
                                    required: true, message: '请选择分类',
                                }],
                            })( <Cascader options={this.state.options} placeholder="请选择分类"
                                          changeOnSelect  loadData={this.loadData}/>)}
                        </Item>
                        <Item label="商品价格">
                            {getFieldDecorator('price', {
                                rules: [{
                                    required: true, message: '请输入商品价格',
                                }],
                            })( <InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  // 每3位数字就有一个，并且开头￥
                                parser={value => value.replace(/￥\s?|(,*)/g, '')} // 去除非数字的内容
                            />)}
                        </Item>
                        
                        <Item label="商品详情" wrapperCol={{xs: {span: 24 },sm: {span: 21 }}}>
                            <RichTextEditor ref={this.richTextEditor}/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="form-btn">提交</Button>
                        </Item>
                    </Form>
                </Card>
            )
    }
}
export default SaveUpdate