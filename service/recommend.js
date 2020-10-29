import request from './network.js'

// 获取每日推荐
export function getRecommend(cookie){
	return request({
		url:'/recommend/songs',
		data:{
			cookie
		}
	})
}