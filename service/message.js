import request from './network.js'

// 发送私信
export function getSend(user_ids,msg,cookie){
	return request({
		url:'/send/text',
		data:{
			user_ids,
			msg,
			cookie
		}
	})
}

// 私信的用户
export function getPrivateMsg(cookie){
	return request({
		url:'/msg/private',
		data:{
			cookie
		}
	})
}

// 私信内容---发送和接收的内容
export function getPrivate(uid,cookie){
	return request({
		url:'/msg/private/history',
		data:{
			uid,
			cookie
		}
	})
}

// 通知
export function getMsg(cookie){
	return request({
		url:'/msg/notices',
		data:{
			cookie
		}
	})
}