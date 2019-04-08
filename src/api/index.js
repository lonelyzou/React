import ajax from './ajax'
import jsonp from 'jsonp';
//区分开发环境与生产环境
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000'
//请求登录函数
export const reqLogin = (username, password) => ajax(prefix + '/login',{username, password},'POST')
//请求天气函数
export const reqWeather = (city) =>{
    return new Promise((resolve ,reject ) => {
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            (err, data )=>{
              if (!err){
                  const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                  resolve({weather,weatherImg:dayPictureUrl})
              } else {
                  // 提示错误
                  reject('请求失败，网络不稳定~');
              }
            })
    })
}
// 获取一级或某个二级分类列表
export const reqCategory = (parentId) => ajax(prefix+'/manage/category/list',{parentId})
//添加品类
export const reqAddCategory = (parentId,categoryName) => ajax(prefix+'/manage/category/add',{parentId,categoryName},'POST')
//更新品类名称
export const reqUpdateCategory = (categoryId,categoryName) => ajax(prefix+'/manage/category/update',{categoryId,categoryName},'POST')
//根据分类ID获取分类
export const reqProductsList = (categoryId) => ajax(prefix+'/manage/category/info',{categoryId});
//获取用户列表
export const reqUserList = () => ajax(prefix+'/manage/user/list');
//新增用户
export const reqAddUser = (username,password ,phone ,email ,role_id ) => ajax(prefix+'/manage/user/add',{username,password ,phone ,email ,role_id },'POST')
//获取角色列表
export const reqRoleList = () => ajax(prefix+'/manage/role/list');
//新增角色
export const reqAddRole = (name)=>ajax(prefix+'/manage/role/add',{name},"POST")
//请求分页商品列表数据的函数
export const reqProductList = (pageNum, pageSize)=>ajax(prefix+'/manage/product/list',{pageNum, pageSize})