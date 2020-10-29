import request from './network.js'

export function getTopList(){
	return request({
		url:'/toplist'
	})
}