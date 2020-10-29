import request from './network.js'

// 判断用户是否已注册
export function Existence(phone){
	return request({
		url:'/cellphone/existence/check',
		data:{
			phone
		}
	})
}

// 发送验证码到注册的手机号
export function SendCode(phone){
	return request({
		url:'/captcha/sent',
		data:{
			phone
		}
	})
}

// 验证验证码
export function Verify(phone,captcha){
	return request({
		url:'/captcha/verify',
		data:{
			phone,
			captcha
		}
	})
}

// 注册
export function Register(phone,password,captcha,nickname){
	return request({
		url:'/register/cellphone',
		data:{
			phone,
			password,
			captcha,
			nickname
		}
	})
}