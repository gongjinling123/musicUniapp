import request from './network.js'

// 获取用户关注列表
export function getFollows(uid){
	return request({
		url:'/user/follows',
		data:{
			uid
		}
	})
}

// 最近播放
// uid : 用户 id,
// type : type=1 时只返回 weekData, type=0 时返回 allData
export function getRecord(uid,type){
	return request({
		url:'/user/record',
		data:{
			uid,
			type
		}
	})
}
