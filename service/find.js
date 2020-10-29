import request from './network.js'

// 轮播图
export function getMultiData(){
	return request({
		url:'/banner'
	})
}
// 分层数据
export function getHomePage(){
	return request({
		url:'/homepage/block/page'
	})
}

