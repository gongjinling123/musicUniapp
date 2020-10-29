import request from './network.js'

// 云村热评
export function getComment(){
	return request({
		url:'/comment/hotwall/list'
	})
}