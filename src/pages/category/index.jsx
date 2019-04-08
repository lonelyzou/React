import React, { Component } from 'react';
import {Card, Table, Icon, Button,  Modal,  message} from 'antd';
import MyBtn from '../../components/myButton/index'
import { reqAddCategory, reqCategory, reqUpdateCategory } from '../../api/index'
import AddCategoryForm from './Add-form';
import UpdateCategoryName from './update-CategotyName';


export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],  //保存所有一级分类数据
            subCategories: [], //保存所有二级分类数据
            category: {}, //保存当前选中单个分类数据,要操作分类数据
            parentCategory:{} ,//显示二级数据时选中的二级数据
            isShowAddCategoryModal: false, //是否显示添加分类对话框
            isShowUpdateCategoryNameModal: false, // 修改分类名称对话框显示
            isShowSubCategories: false, // 是否展示二级分类数据
        }
        this.createAddForm = React.createRef();
        this.createUpdateForm = React.createRef();
    }

    // 当请求数据为空时，不要loading
      isLoading = true;

 //定义表格列
    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            width:'300px',
            // dataIndex: 'operator',
            render: category =>{
               return <div>
                    <MyBtn onClick={this.renameModelShow(category)}>修改名称</MyBtn>
                   {   this.state.isShowSubCategories ? null : <MyBtn onClick={this.showSubCategory(category)}>查看其子品类</MyBtn>}
                </div>
            }
        }];
 //获取列表数据的方法
  getCategories = async (parentId)=>{
    // 发送请求
    const result = await reqCategory(parentId)
    if(result.status === 0){
       message.success('获取数据成功');
      //parentId === 0 ：一级列表
        if(result.data.length === 0){
            this.isLoading = false;
            // 等当前更新完成后在调用，目的：让下一次生效
            setTimeout(()=>{
                this.isLoading = true;
            },0)
        }
        const options ={ }; //将一级二级数据先存入options对象中
      if(parentId === "0"){
        options.categories = result.data;
      } else {
          options.subCategories = result.data;
      }
        this.setState( options );
    } else {
      message.error(result.msg)
    }
  }
  //发送请求获取数据
  componentDidMount() {
      this.getCategories("0");
    }
    //添加分类的方法
  addCategory = async () =>{
        // console.log(this.createAddForm.current)
        const {validateFields} = this.createAddForm.current.props.form
        validateFields(async (errors, values) => {
            if(!errors){
                const result = await reqAddCategory(values.parentId,values.categoryName);
                if(result.status === 0){
                    let name = "categories";
                    if(this.state.isShowSubCategories){
                        name = "subCategories";
                    }
                    message.success("添加成功")
                    this.setState({
                        isShowAddCategoryModal: false,
                        [name]: [...this.state[name],result.data]
                    })
                }
            }else {
                // 校验失败 -- 啥也不做
            }
        });
    }
    //修改分类名称
  updateCategoryName = async () =>{
      const {validateFields,resetFields} = this.createUpdateForm.current.props.form
      validateFields(async (errors, values) => {
         if(!errors){
             const { categoryName } = values;
             const {category:{ _id },isShowSubCategories}= this.state;
             //修改后的名称
             const result = await reqUpdateCategory( _id,categoryName);
             if(result.status === 0){
                 let name = "categories"
                 if(isShowSubCategories){
                     name = "subCategories"
                 }
                 message.success("修改成功")
                 this.setState({
                     isShowUpdateCategoryNameModal: false,
                     [name]: this.state[name].map((item)=>{
                         if(item._id ===  _id){
                             return {...item,name:categoryName }
                         }
                         return item
                     })
                 })
                 console.log("11111")
                 console.log(this.state.category)
                 //重置表单项
                 resetFields();
                 console.log("22222")
                 console.log(this.state.category)
             } else {
                 message.error(result.msg);
             }
         }else {
             // 校验失败 -- 啥也不做
         }
      });
  }
  //
  renameModelShow = (category)=>{
       return ()=>{
           this.setState({
               category:category
           })
           this.showModal('isShowUpdateCategoryNameModal',true)()
       }
    }

  showSubCategory = (parentCategory)=>{
        return ()=>{
            this.setState({
                parentCategory:parentCategory,
                isShowSubCategories: true, // 是否展示二级分类数据
            })
            this.getCategories(parentCategory._id);
        }
    }

  showModal = (name,isShow) => {
     return ()=>{
         this.setState({
             [name]:isShow
         })
     }
  }
  //回退到一级分类
  goBack = ()=>{
      this.setState({
          isShowSubCategories: false
      })
    }
   render() {
   const { categories,isShowAddCategoryModal,isShowUpdateCategoryNameModal ,category,isShowSubCategories,subCategories,parentCategory} = this.state;
    return (
        <Card title={isShowSubCategories ? <div><MyBtn onClick={this.goBack}>一级列表</MyBtn><Icon type="arrow-right"/><span>{parentCategory.name}</span></div> :"一级列表"} extra={<Button type="primary" onClick={this.showModal('isShowAddCategoryModal',true)}><Icon type="plus"/>添加品类</Button>
          } style={{ width: "100%" }}>
            <Table
                columns={this.columns}
                dataSource={isShowSubCategories ? subCategories : categories }
                bordered
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions:['3','6','9','12'],
                  defaultPageSize: 3,
                  showQuickJumper:true,

                }}
                rowKey="_id"
                loading={ isShowSubCategories ?   this.isLoading && !subCategories.length :  this.isLoading && !categories.length}
            />
              <Modal
                title="添加分类"
                visible={isShowAddCategoryModal}
                onOk={this.addCategory}
                onCancel={this.showModal('isShowAddCategoryModal',false)}
                okText="确认"
                cancelText="取消"
              >
              <AddCategoryForm categories={categories} wrappedComponentRef={this.createAddForm } />
              </Modal>

              <Modal
                  title="修改分类名称"
                  visible={isShowUpdateCategoryNameModal}
                  onOk={this.updateCategoryName}
                  onCancel={this.showModal('isShowUpdateCategoryNameModal',false)}
                  okText="确认"
                  cancelText="取消"
              >
                  <UpdateCategoryName categoryName={category.name} wrappedComponentRef={this.createUpdateForm } />
              </Modal>
          </Card>
    )
  }
}



