/**
 * 关于用户所需的接口封装
 * 调用封装在App.vue 里面的global_request
 * 参数详解:global_request(url, data, method, flag)
 * url:表示拼接的地址,data:数据对象,method:请求方式,flage:可以不传值
 */

//! 解构获取global_request函数
const {global_request} = getApp().globalData;

export default {
	login(data) {
		return global_request('/api/wxuser/login',data,'POST');
	}
}
