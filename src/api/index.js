import ajax from './ajax'

//区分开发环境与生产环境
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000'
export const reqLogin = (username, password) => ajax(prefix + '/login',{username, password},'POST')