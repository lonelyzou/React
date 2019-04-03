// 操作storage的模块

const Key = 'user'

//获取用户信息方法
export function getItem() {
    const user = localStorage.getItem(Key);
    if(!user){
        return '';
    }
    return JSON.parse(user);
}

//保存用户信息方法
export function setItem(value) {
    if(!value || typeof value === 'function'){
        console.log('保存用户数据失败：',value);
        return ;
    }
    localStorage.setItem(Key, JSON.stringify(value));
}

//删除用户信息
export function removeItem() {
    localStorage.removeItem(Key)
}