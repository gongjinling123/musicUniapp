import request from './network.js'

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

// 获取喜欢的歌曲详情
export function getSongDetail(ids){
	return request({
		url:'/song/detail',
		data:{
			ids
		}
	})
}