import {BaseURL} from './config.js'

export default function (option){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BaseURL+option.url,
			method:option.method||'get',
			data:option.data||{},
			header:option.header||{},
			success:resolve,
			fail:reject
		})
	})
}