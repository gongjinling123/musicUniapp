import request from './network.js'

// 获取视频标签列表
export function getVideoCategory(cookie){
	return request({
		url:'/video/category/list',
		data:{
			cookie
		}
	})
}