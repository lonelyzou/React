import React, { Component } from 'react';
import MyBtn from '../../components/myButton/index'
import {Button, Card, Icon, Modal, Table,Select,Input,Form,Cascader,InputNumber} from "antd";
const Item = Form.Item
@Form.create()
class SaveUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
        };
    }
    change = ()=>{
       this.props.history.replace("/product")
    }

    render() {
        const { form : { getFieldDecorator }} = this.props;
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                }],
            }, {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    }],
                }],
            }];
        const { opacity , formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 2},
            wrapperCol: { span: 14 },
        } : null;
            return (
                <Card title={<span><MyBtn onClick={this.change}><Icon type="arrow-left" style={{color:"black",fontSize:"25px"}}/></MyBtn>添加商品</span>}>
                    <Form layout={formLayout}>
                        <Item label="商品名称" {...formItemLayout}>
                            {getFieldDecorator('productName', {
                                rules: [{
                                    required: true, message: '请输入商品名称',
                                }],
                            })(
                                <Input placeholder="请输入商品名称" style={{width:"70%"}}/>
                            )}
                        </Item>
                        <Item label="商品描述" {...formItemLayout}>
                            <Input placeholder="请输入商品描述" style={{width:"70%"}}/>
                        </Item>
                        <Item label="选择分类" {...formItemLayout}>
                            <Cascader options={options} placeholder="请选择分类" style={{width:"35%"}}/>
                        </Item>
                        <Item label="商品价格" {...formItemLayout}>
                            <InputNumber
                                defaultValue={0}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                            />
                        </Item>
                        <Item label="商品详情" {...formItemLayout}>
                            <Input placeholder="请输入商品描述" style={{width:"70%"}}/>
                        </Item>
                        <Item {...formItemLayout}>
                            <Button type="primary" htmlType="submit" style={{marginLeft:"4%"}}>提交</Button>
                        </Item>
                    </Form>
                </Card>
            )
    }
}
export default SaveUpdate