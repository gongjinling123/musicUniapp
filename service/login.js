import request from './network.js'

// 手机号密码登录
export function getPhoneLogin(phone,password){
	return request({
		url:"/login/cellphone",
		data:{
			phone,
			password
		}
	})
}

// 163邮箱登录
export function getEmailLogin(email,password){
	return request({
		url:"/login",
		data:{
			email,
			password
		}
	})
}

// 发送验证码
export function getSentCode(phone){
	return request({
		url:'/captcha/sent',
		data:{
			phone
		}
	})
}

// 验证验证码
export function getVerifyCode(phone,captcha){
	return request({
		url:'/captcha/verify',
		data:{
			phone,
			captcha
		}
	})
}