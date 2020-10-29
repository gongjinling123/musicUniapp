import request from './network.js'

// 获取用户详情
export function getUserDetail(uid){
	return request({
		url:'/user/detail',
		data:{
			uid
		}
	})
}

// 获取用户歌单
export function getUserPlayList(uid){
	return request({
		url:'/user/playlist',
		data:{
			uid
		}
	})
}

// 喜欢的音乐（需要登录）--返回的是音乐的id
export function getLike(uid,cookie){
	return request({
		url:'/likelist',
		data:{
			uid, 
			cookie
		}
	})
}

// 获取用户等级
export function getLevel(cookie){
	return request({
		url:'/user/level',
		data:{
			cookie
		}
	})
}
	
// 更换头像
export function uploadAvatar(cookie){
	return request({
		url:'/avatar/upload',
	 
		header: {
			'Content-Type': 'multipart/form-data',
		},
		data:{
			cookie
		}
	})
}