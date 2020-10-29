// 最近播放
import request from './network.js'

// 获取用户播放记录  type=1时返回的是一周的记录；type=0时返回的是所有的记录
export function getRecord(uid,type){
	return request({
		url:'/user/record',
		data:{
			uid,
			type
		}
	})
}


// 删除歌单（需要登录）
export function getDelete(id,cookie){
	return request({
		url:'/playlist/delete',
		data:{
			id,
			cookie
		}
	})
}
